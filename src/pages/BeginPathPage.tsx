import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useLocation, useParams } from "react-router-dom";
import { DirectionsService, useJsApiLoader } from "@react-google-maps/api";
import Container from "../components/Container";

function BeginPathPage() {
  const { location } = useParams();
  const [steps, setSteps] = useState<string[]>([]);
  const [totalDistance, setTotalDistance] = useState<string>("");
  const [totalDuration, setTotalDuration] = useState<string>("");

  const [currentPosition, setCurrentPosition] = useState<any>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEAPI, // Replace with your API key
  });

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

  useEffect(() => {
    getDirections();
  }, [isLoaded, location]);
  return (
    <MainLayout>
      {location && isLoaded && (
        <DirectionsService
          options={{
            origin: currentPosition,
            destination: location,
            travelMode: google.maps.TravelMode.DRIVING,
          }}
          callback={(response: any) => {
            if (response.status === "OK") {
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
      <Container>
        <div className="flex flex-col items-start gap-[20px]">
          <h1 className="text-[32px] font-bold">Begin path</h1>
          <div className="flex gap-[10px]">
            <div className="flex flex-col items-start gap-[10px] w-full">
              <span>Path Location</span>
              <div className="flex flex-col items-start gap-[10px]">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-[10px] items-center">
                    <div className="h-[48px] w-[48px] rounded-full bg-[#4BB9B3E5] flex shrink-0 items-center justify-center"></div>
                    <div dangerouslySetInnerHTML={{ __html: step }}></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span>Total distance: {totalDistance}</span>
                <span>Total duration: {totalDuration}</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[10px] w-full">
              <span>Detected Obstacles</span>
              <div className="flex flex-col gap-[10px]">
                {[
                  "Pothole",
                  "Construction",
                  "Roadblock",
                  "Traffic Jam",
                  "Accident",
                ].map((obstacle, index) => (
                  <div
                    key={index}
                    className="font-[700] flex gap-[10px] items-center"
                  >
                    <div className="h-[48px] w-[48px] rounded-full bg-[#4BB9B3E5] flex items-center justify-center"></div>
                    <span>{obstacle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}

export default BeginPathPage;
