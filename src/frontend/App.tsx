// src/frontend/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Top from './pages/Top';
import Service from './pages/Service';
import Map from './pages/Map';
import AndMore from './pages/AndMore';
import Message from './pages/Message';
import Footer from './layout/Footer';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import FilterSearchToile from './pages/FilterSearchToile';
import MapSearchToile from './pages/MapSearchToile';
import RegistrationRestroom from './pages/RegistrationRestroom';
import MapComponent from './components/features/map/MapComponent';
import { UserProvider } from './context/UserContext';
import ToiletDetail from './pages/ToiletDetail';
import { Toilet } from './interfaces/Toilet_Interfaces'; 
import MyFavoritesComponent from './common/MyFavoritesComponent';
import MyPage from './pages/MyPage';

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
            <Route path="/MyPage" element={<MyPage />} />
          </Routes>
          <MapComponent newToilets={newToilets} />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
