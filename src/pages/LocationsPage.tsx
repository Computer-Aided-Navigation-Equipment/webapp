import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import UserIcon from "../icons/UserIcon";
import PlusIcon from "../icons/PlusIcon";
import axiosRequest from "../utils/axiosConfig";
import toast from "react-hot-toast";
import { Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import PrimaryButton from "../components/PrimaryButton";
import { Loader } from "@mantine/core";
import { useLoadScript } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLEAPI;

function LocationsPage() {
  const [locations, setLocations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [distances, setDistances] = useState<{ [key: string]: string }>({});
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  useEffect(() => {
    if (isLoaded && locations.length > 0) {
      getUserLocation();
    }
  }, [isLoaded, locations]);
  useEffect(() => {
    setIsLoading(true);
    axiosRequest
      .get("/location/get-user")
      .then((res) => {
        setLocations(res.data.locations);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      getUserLocation();
    }
  }, [locations]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          calculateDistances(latitude, longitude);
        },
        (error) => {
          toast.error("Failed to get location");
          console.error(error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const calculateDistances = (lat: number, lng: number) => {
    if (!isLoaded || !window.google) {
      toast.error("Google Maps API is not loaded yet.");
      return;
    }

    try {
      const service = new google.maps.DistanceMatrixService();
      const origins = [{ lat, lng }];
      const destinations = locations.map((loc) => loc.location);

      service.getDistanceMatrix(
        {
          origins,
          destinations,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (!response) {
            return;
          }
          if (status === "OK" && response.rows.length > 0) {
            const results = response.rows[0].elements;
            const distanceMap: { [key: string]: string } = {};
            results.forEach((result, index) => {
              distanceMap[locations[index].id] =
                result.status === "OK" ? result.distance.text : "N/A";
            });
            setDistances(distanceMap);
          } else {
            toast.error("Error fetching distances");
          }
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      title: "",
      location: "",
    },
    validate: {
      location: (value) => {
        if (!value) {
          return "Location is required";
        }
      },
      title: (value) => {
        if (!value) {
          return "Title is required";
        }
      },
    },
  });
  const handleAddLocation = () => {
    axiosRequest
      .post("/location/create", form.values)
      .then((res) => {
        toast.success(res.data.message);
        close();
      })
      .catch((err) => {
        if (err.response.data.message) {
          return toast.error(err.response.data.message);
        }
        toast.error("An error occurred");
      });
  };
  return (
    <MainLayout>
      <Container>
        <div className="flex relative flex-col w-full gap-[20px]">
          <div className="flex justify-between w-full gap-[100px]">
            <h1 className="text-[36px] font-[700]">Saved Locations</h1>
            <div className="h-[70px] w-[70px] rounded-full bg-[#4BB9B3E5] flex items-center justify-center">
              <UserIcon />
            </div>
          </div>
          <div className="flex justify-between w-full items-start">
            <div className="flex flex-col gap-[5px]">
              <span>Locations</span>
              <span className="underline font-[600]">Edit</span>
            </div>
            <div
              onClick={open}
              className="h-[50px] w-[50px] rounded-full flex items-center justify-center cursor-pointer"
            >
              <PlusIcon />
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-2 gap-[20px] mt-4 w-full">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="p-4 relative border shadow-sm bg-[#D9D9D980] rounded-[20px] h-[60px] flex items-center gap-[20px] justify-between px-[10px]"
                >
                  <div className="flex flex-col gap-[5px]">
                    <h2 className="text-xl font-[700]">{location.title}</h2>
                    <p>{location.location}</p>
                  </div>
                  <div>{distances[location.id] || "Calculating..."}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
      <Modal opened={opened} onClose={close} title="Add Location">
        <form
          onSubmit={form.onSubmit(handleAddLocation)}
          className="flex flex-col gap-[10px] w-full"
        >
          <TextInput
            label="Title"
            placeholder="Title"
            {...form.getInputProps("title")}
          />
          <TextInput
            label="Location"
            placeholder="Location"
            withAsterisk
            {...form.getInputProps("location")}
          />
          <PrimaryButton type="submit">Add Location</PrimaryButton>
        </form>
      </Modal>
    </MainLayout>
  );
}

export default LocationsPage;
