// src/components/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Header';
import Top from './Top';
import Service from './Service';
import Map from './Map';
import AndMore from './AndMore';
import Message from './Message';
import Footer from './Footer';
import Login from './Login';
import CreateAccount from './CreateAccount';
import FilterSearchToile from './FilterSearchToile';
import MapSearchToile from './MapSearchToile';
import RegistrationRestroom from './RegistrationRestroom';
import MapComponent from './MapComponent';
import { UserProvider } from '../../UserContext.jsx';
import ToiletDetail from './ToiletDetail';

function App() {
  const [newToilets, setNewToilets] = useState([]);

  const handleNewToilet = (toilet) => {
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
