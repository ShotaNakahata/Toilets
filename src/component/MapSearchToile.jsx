import  { useRef, useState } from "react";
import { Link } from 'react-router-dom';
import toiletsData from '../data/toiletsData';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import UserLocation from './UserLocation';
import MapComponent from './MapComponent';
import Map from './Map';


function MapSearchToile() {

    

    return (
        <div className="container-SearchToile">
            <div className="SearchToile-wrapper">
                <h1>SearchToile</h1>
                <h2>Map Search Mode</h2>
                <Link to="/FilterSearchToile" className="ChangeSearchMode-button">Filtered Search Mode</Link>
                <Link to="/" className="home-button">Return to Home</Link>
                <div className="Mapuse">
                <Map />
                </div>
                
                    



                </div>
    

        </div>
    );
}

export default MapSearchToile;





