// src/context/MapStateContext.tsx
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
    isScriptLoaded: boolean; // Google Maps スクリプトが読み込まれたかのフラグ
    setIsScriptLoaded: React.Dispatch<React.SetStateAction<boolean>>; // スクリプトの読み込み状態を設定する関数
    markers: MarkerData[]; // マーカー情報
    setMarkers: React.Dispatch<React.SetStateAction<MarkerData[]>>; // マーカー情報を設定する関数
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
    const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false); // Google Maps スクリプトの読み込み状態
    const [markers, setMarkers] = useState<MarkerData[]>([]); // マーカー情報の状態

    return (
        <MapStateContext.Provider value={{ 
            toilets, setToilets, 
            center, setCenter, 
            isScriptLoaded, setIsScriptLoaded, 
            markers, setMarkers }}>

            {children}
        </MapStateContext.Provider>
    );
}
// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { Toilet } from "../interfaces/Toilet_Interfaces";

// // LatLngLiteral の再定義
// interface LatLngLiteral {
//     lat: number;
//     lng: number;
// }

// interface MapStateContextType {
//     toilets: Toilet[];
//     setToilets: React.Dispatch<React.SetStateAction<Toilet[]>>;
//     center: LatLngLiteral;
//     setCenter: React.Dispatch<React.SetStateAction<LatLngLiteral>>;
//     isScriptLoaded: boolean; // Google Maps スクリプトが読み込まれたかのフラグ
//     setIsScriptLoaded: React.Dispatch<React.SetStateAction<boolean>>; // スクリプトの読み込み状態を設定する関数
//     markers: google.maps.Marker[]; // マーカー情報を保持するgoogle.maps.Marker型に変更
//     setMarkers: React.Dispatch<React.SetStateAction<google.maps.Marker[]>>; // マーカー情報を設定する関数
// }

// const MapStateContext = createContext<MapStateContextType | undefined>(undefined);

// export const useMapState = () => {
//     const context = useContext(MapStateContext);
//     if (!context) {
//         throw new Error('useMapState must be used within a MapStateProvider');
//     }
//     return context;
// }

// interface MapStateProviderProps {
//     children: ReactNode;
// }

// export const MapStateProvider: React.FC<MapStateProviderProps> = ({ children }) => {
//     const [toilets, setToilets] = useState<Toilet[]>([]);
//     const [center, setCenter] = useState<LatLngLiteral>({ lat: 34.705493, lng: 135.490685 });
//     const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false); // Google Maps スクリプトの読み込み状態
//     const [markers, setMarkers] = useState<google.maps.Marker[]>([]); // マーカー情報の状態を保持

//     return (
//         <MapStateContext.Provider value={{ 
//             toilets, setToilets, 
//             center, setCenter, 
//             isScriptLoaded, setIsScriptLoaded, 
//             markers, setMarkers // マーカー情報を渡す
//         }}>
//             {children}
//         </MapStateContext.Provider>
//     );
// }
