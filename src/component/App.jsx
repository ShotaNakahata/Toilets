// vite-project/src/components/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import { UserProvider } from '../../UserContext.jsx';

function App() {
  return (
    <UserProvider> {/* UserContextで全コンポーネントをラップ */}
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<><Top /><Service /><Map /><AndMore /><Message /><Footer /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/MapSearchToile" element={<MapSearchToile />} />
            <Route path="/FilterSearchToile" element={<FilterSearchToile />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;


