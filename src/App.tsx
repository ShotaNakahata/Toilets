import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Home from './components/pages/Home'; 
import LoginPage from './components/pages/LoginPage';
import CreateAccount from './components/pages/CreateAccount';
import FilterSearchToile from './components/pages/FilterSearchToile';
import RegistrationRestroomPage from './components/pages/RegistrationRestroomPage';
import { UserProvider } from './context/UserContext';
import { MapStateProvider } from './context/MapStateContext'; 
import ToiletDetail from './components/pages/ToiletDetail';
import MyPage from './components/pages/MyPage';
import ContactPage from './components/pages/ContactPage';
import Map from './components/pages/Map';
import { Toilet } from './interfaces/Toilet_Interfaces';

const App: React.FC = () => {
  const [newToilets, setNewToilets] = useState<Toilet[]>([]);
  const location = useLocation(); // useLocation はそのまま使う

  const handleNewToilet = (toilet: Toilet) => {
    setNewToilets(prevToilets => [...prevToilets, toilet]);
  };

  return (
    <UserProvider>
      <MapStateProvider>
        <Header />
        <AnimatePresence mode="wait"> {/* 修正点 */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/FilterSearchToile" element={<FilterSearchToile />} />
            <Route path="/RegistrationRestroom" element={<RegistrationRestroomPage />} />
            <Route path="/toilet/:id" element={<ToiletDetail />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/map" element={<Map />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      </MapStateProvider>
    </UserProvider>
  );
};

export default App;



