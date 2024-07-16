import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Top from './components/pages/Top';
import Service from './components/pages/Service';
import Map from './components/pages/Map';
import AndMore from './components/pages/AndMore';
import Message from './components/pages/Message';
import Footer from './components/layout/Footer';
import Login from './components/pages/Login';
import CreateAccount from './components/pages/CreateAccount';
import FilterSearchToile from './components/pages/FilterSearchToile';
import MapSearchToile from './components/pages/MapSearchToile';
import RegistrationRestroom from './components/pages/RegistrationRestroom';
import MapComponent from './features/map/MapComponent';
import { UserProvider } from './context/UserContext';
import ToiletDetail from './components/pages/ToiletDetail';
import { Toilet } from './interfaces/Toilet_Interfaces'; 

const App: React.FC = () => {
  const [newToilets, setNewToilets] = useState<Toilet[]>([]);

  const handleNewToilet = (toilet: Toilet) => {
    setNewToilets(prevToilets => [...prevToilets, toilet]);
  };

  return (
    <UserProvider> 
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<><Top /><Service /><Map /><AndMore /><Message /><Footer /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/MapSearchToile" element={<MapSearchToile />} />
            <Route path="/FilterSearchToile" element={<FilterSearchToile />} />
            <Route path="/RegistrationRestroom" element={<RegistrationRestroom onNewToilet={handleNewToilet} />} /> 
            <Route path="/toilet/:id" element={<ToiletDetail />} />
          </Routes>
          <MapComponent newToilets={newToilets} />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
