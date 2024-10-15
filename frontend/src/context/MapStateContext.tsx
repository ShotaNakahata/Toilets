// frontend/src/context/MapStateContext.ts
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Toilet } from "../interfaces/Toilet_Interfaces";
import { MarkerData } from "../interfaces/MarkerData_Interfaces"; 

// LatLngLiteral の再定義
interface LatLngLiteral {
    lat: number;
    lng: number;
}

interface MapStateContextType {
    toilets: Toilet[];
    setToilets: React.Dispatch<React.SetStateAction<Toilet[]>>;
    center: LatLngLiteral;
    setCenter: React.Dispatch<React.SetStateAction<LatLngLiteral>>;
    isScriptLoaded: boolean;
    setIsScriptLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    markers: MarkerData[];
    setMarkers: React.Dispatch<React.SetStateAction<MarkerData[]>>;
    userLocation: LatLngLiteral | null;
    setUserLocation: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
}

const MapStateContext = createContext<MapStateContextType | undefined>(undefined);

export const useMapState = () => {
    const context = useContext(MapStateContext);
    if (!context) {
        throw new Error('useMapState must be used within a MapStateProvider');
    }
    return context;
}

interface MapStateProviderProps {
    children: ReactNode;
}

export const MapStateProvider: React.FC<MapStateProviderProps> = ({ children }) => {
    const [toilets, setToilets] = useState<Toilet[]>([]);
    const [center, setCenter] = useState<LatLngLiteral>({ lat: 34.705493, lng: 135.490685 });
    const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null);  // 初期値はnull

    return (
        <MapStateContext.Provider value={{ 
            toilets, setToilets, 
            center, setCenter, 
            isScriptLoaded, setIsScriptLoaded, 
            userLocation, setUserLocation,  // userLocationをプロバイダに渡す
            markers, setMarkers }}>

            {children}
        </MapStateContext.Provider>
    );
}