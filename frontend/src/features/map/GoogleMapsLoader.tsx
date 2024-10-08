// src/features/map/GoogleMapsLoader.tsx
import React, { useEffect, useState } from "react";
import { useMapState } from "../../context/MapStateContext";


const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = ['places'];

const GoogleMapsLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isScriptLoaded, setIsScriptLoaded } = useMapState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isScriptLoaded) {
            console.log("Google Maps script is already loaded.");
            setIsLoaded(true);
            return;
        }

        console.log("Checking if Google Maps is loaded...");
        if (window.google && window.google.maps) {
            console.log("Google Maps already loaded.");
            setIsScriptLoaded(true);
            setIsLoaded(true);
        } else {
            console.log("Google Maps not loaded yet. Loading script...");
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}`;
            script.async = true;
            script.onload = () => {
                console.log("Google Maps script loaded.");
                setIsScriptLoaded(true);
                setIsLoaded(true);
            };
            script.onerror = () => {
                console.error('Error loading Google Maps script');
            };
            document.head.appendChild(script);
        }
    }, [isScriptLoaded, setIsScriptLoaded]);

    useEffect(() => {
        if (isScriptLoaded) {
            console.log("Google Maps script is fully loaded.");
        }
    }, [isScriptLoaded]);

    return (
        <>
            {isLoaded && children}
        </>
    );
};

export default GoogleMapsLoader;
