// src/App.tsx
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
// import MapSearchToile from './components/pages/MapSearchToile';
import RegistrationRestroom from './components/pages/RegistrationRestroom';
import { UserProvider } from './context/UserContext';
import { MapStateProvider } from './context/MapStateContext'; 
import ToiletDetail from './components/pages/ToiletDetail';
import { Toilet } from './interfaces/Toilet_Interfaces'; 
import MyPage from './components/pages/MyPage';

const App: React.FC = () => {
  const [newToilets, setNewToilets] = useState<Toilet[]>([]);

  const handleNewToilet = (toilet: Toilet) => {
    setNewToilets(prevToilets => [...prevToilets, toilet]);
  };

  return (
    <UserProvider>
      <MapStateProvider>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<><Top /><Service /><AndMore /><Message /><Footer /></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/CreateAccount" element={<CreateAccount />} />
              <Route path="/FilterSearchToile" element={<FilterSearchToile />} />
              <Route path="/RegistrationRestroom" element={<RegistrationRestroom onNewToilet={handleNewToilet} />} />
              <Route path="/toilet/:id" element={<ToiletDetail />} />
              <Route path="/MyPage" element={<MyPage />} />
              <Route path="/map" element={<Map />} />
            </Routes>
          </div>
        </Router>
      </MapStateProvider>
    </UserProvider>
  );
}

export default App;

