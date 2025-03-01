import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Input } from "@mantine/core";
import MicIcon from "../icons/MicIcon";
import PrimaryButton from "../components/PrimaryButton";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import axiosRequest from "../utils/axiosConfig";
import toast from "react-hot-toast";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function NavigationPage() {
  const [location, setLocation] = useState("");
  const [listening, setListening] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [currentPosition, setCurrentPosition] = useState<any>(null);
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [totalDistance, setTotalDistance] = useState<string>("");
  const [totalDuration, setTotalDuration] = useState<string>("");

  const [savedLocations, setSavedLocations] = useState<any[]>([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEAPI, // Replace with your API key
  });

  const handleMicClick = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setListening(true);
      console.log("Listening...");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setLocation(transcript);
      console.log("Transcript:", transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Error occurred in recognition:", event.error);
    };

    recognition.onend = () => {
      setListening(false);
      console.log("Stopped listening");
    };

    recognition.start();
  };

  const getDirections = () => {
    if (!location) {
      alert("Please enter a location");
      return;
    }

    // Get the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting current position:", error);
        alert("Failed to get your current location.");
      }
    );
  };

  const startNavigation = () => {
    if (!currentPosition || !location) {
      alert("Please get directions first");
      return;
    }
    setNavigationStarted(true);
    console.log("total distance");
    console.log(totalDistance);
    axiosRequest
      .post("/log/create", {
        numberOfObsticles: steps.length,
        numberOfSteps: steps.length,
        miles: totalDistance,
      })
      .then((res) => {
        toast.success("Navigation started");
      })
      .catch((err) => {
        if (err.response.data.message) {
          return toast.error(err.response.data.message);
        }
        toast.error("Error starting navigation");
      });
  };

  const extractSteps = (directions: any) => {
    const stepsArray = directions.routes[0].legs[0].steps.map(
      (step: any) => step.instructions
    );
    setSteps(stepsArray);

    const totalDistance = directions.routes[0].legs[0].distance.text;
    const totalDuration = directions.routes[0].legs[0].duration.text;
    setTotalDistance(totalDistance);
    setTotalDuration(totalDuration);

    console.log(stepsArray);
  };

  const handlSaveLocation = () => {
    axiosRequest
      .post("/location/create", { location })
      .then((res) => {
        toast.success("Location saved successfully");
        setSavedLocations([...savedLocations, res.data.location]);
      })
      .catch((err) => {
        console.error("Error saving location:", err);
        toast.error("Failed to save location");
      });
  };

  useEffect(() => {
    axiosRequest.get("/location/get-user").then((res) => {
      setSavedLocations(res.data.locations);
    });
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-[20px] h-full w-full">
        <div className="bg-[#4BB9B312] h-[170px] flex text-[40px] font-bold w-full justify-center items-center">
          Navigation
        </div>
        <div className="flex flex-col items-center gap-[20px] w-full">
          <div className="relative">
            <Input
              placeholder="Write/Say location"
              className="min-w-[300px]"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <div
              className={`cursor-pointer absolute right-[10px] top-[5px] ${
                listening ? "text-red-500" : ""
              }`}
              onClick={handleMicClick}
            >
              <MicIcon />
            </div>
          </div>
          <div className="flex gap-[10px]">
            {" "}
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-[700] mb-2">Saved Locations:</h2>
              <ul>
                {savedLocations.map((location: any, index: number) => (
                  <PrimaryButton
                    key={index}
                    onClick={() => {
                      setLocation(location.location);
                    }}
                  >
                    {location.location}
                  </PrimaryButton>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-[10px]">
              <PrimaryButton onClick={getDirections}>
                Get Directions
              </PrimaryButton>
              <PrimaryButton onClick={startNavigation}>Start</PrimaryButton>
            </div>
          </div>
        </div>
        <div className="flex gap-[10px] w-full">
          {steps.length > 0 && (
            <div className="mt-4 px-[20px]">
              <h2 className="text-xl font-[700] mb-2 text-[24px]">
                Directions:
              </h2>
              <p>
                <strong>From:</strong> Your current location
              </p>
              <p>
                <strong>To:</strong> {location}
              </p>
              <ul className="list-disc list-inside">
                {steps.map((step, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: step }} />
                ))}
              </ul>
              <div className="mt-4">
                <p>
                  <strong>Total Distance:</strong> {totalDistance}
                </p>
                <p>
                  <strong>Total Duration:</strong> {totalDuration}
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-[10px] w-full">
            {" "}
            {isLoaded && currentPosition && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={10}
              >
                {currentPosition && location && (
                  <DirectionsService
                    options={{
                      origin: currentPosition,
                      destination: location,
                      travelMode: google.maps.TravelMode.DRIVING,
                    }}
                    callback={(response: any) => {
                      if (response.status === "OK") {
                        setDirectionsResponse(response);
                        extractSteps(response);
                      } else {
                        console.error(
                          "Directions request failed due to",
                          response.status
                        );
                      }
                    }}
                  />
                )}

                {navigationStarted && directionsResponse && (
                  <DirectionsRenderer directions={directionsResponse} />
                )}
              </GoogleMap>
            )}
            {isLoaded && currentPosition && (
              <PrimaryButton onClick={handlSaveLocation}>
                Save Location
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default NavigationPage;
