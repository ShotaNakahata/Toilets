import React, { useEffect, useImperativeHandle, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useMapState } from "../../context/MapStateContext";

const MapComponent = React.forwardRef<google.maps.Map | null>((props, ref) => {
    const { center, setCenter } = useMapState();
    const mapRef = useRef<google.maps.Map | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current as HTMLInputElement);
        autocomplete.bindTo("bounds", map);

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) {
                console.log("No details available for input: '" + place.name + "'");
                return;
            }

            const location = place.geometry.location;
            setCenter({
                lat: location.lat(),
                lng: location.lng(),
            });

            if (mapRef.current) {
                mapRef.current.setCenter(location);
                mapRef.current.setZoom(15);
            }
        });
    };

    useImperativeHandle(ref, () => mapRef.current || new google.maps.Map(document.createElement('div')), [mapRef.current]);

    useEffect(() => {
        if (navigator.geolocation) {
            console.log("Attempting to fetch user location...");
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    console.log("User location found:", userLocation);
                    setCenter(userLocation);
                    if (mapRef.current) {
                        mapRef.current.setCenter(userLocation);
                    }
                },
                (error) => {
                    console.error("Error fetching user location: ", error);
                    console.log("Error code:", error.code);
                    console.log("Error message:", error.message);
                    const defaultLocation = { lat: 34.705493, lng: 135.490685 };
                    setCenter(defaultLocation);
                    if (mapRef.current) {
                        mapRef.current.setCenter(defaultLocation);
                    }
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, [setCenter]);

    return (
        <div className="relative bg-background rounded-lg shadow-white overflow-hidden h-[500px] w-full">
            <input
                ref={inputRef}
                type="text"
                placeholder="Search places..."
                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 sm:p-3 rounded-lg bg-background shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 w-[60%] sm:w-[80%] max-w-[600px] text-base"
            />

            <GoogleMap
                mapContainerClassName="w-full h-full"
                center={center}
                zoom={15}
                onLoad={handleMapLoad}
                options={{
                    mapTypeControl: false,
                    fullscreenControl: true,
                    streetViewControl: false,
                }}
            />
        </div>

    );
});

export default MapComponent;

