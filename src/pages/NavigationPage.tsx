import React, { useState } from "react";
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

const containerStyle = {
  width: "100%",
  height: "400px",
};

function NavigationPage() {
  const [location, setLocation] = useState("");
  const [listening, setListening] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [currentPosition, setCurrentPosition] = useState<any>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCg5OB2YaxdEZcBIRmevl_d8v_RJ58CYsk", // Replace with your API key
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

          {/* <div className="w-full">
            {" "}
            <GoogleMap
              //   mapContainerStyle={containerStyle}
              //   center={currentPosition}
              zoom={10}
            ></GoogleMap>
          </div> */}

          <PrimaryButton onClick={getDirections}>Get Directions</PrimaryButton>
        </div>

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
                  } else {
                    console.error(
                      "Directions request failed due to",
                      response.status
                    );
                  }
                }}
              />
            )}

            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        )}
      </div>
    </MainLayout>
  );
}

export default NavigationPage;
