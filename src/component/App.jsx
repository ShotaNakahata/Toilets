import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Top from './Top';
import Service from './Service';
import Map from './Map';
import AndMore from './AndMore';
import Message from './Message';
import Footer from './Footer';
import Login from './Login'; // Login コンポーネントをインポート

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<><Top /><Service /><Map /><AndMore /><Message /><Footer /></>} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
