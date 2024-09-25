import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import { UserProvider } from './context/UserContext';
import { MapStateProvider, useMapState } from './context/MapStateContext';

// .envファイルからAPIキーを取得
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Home = React.lazy(() => import('./components/pages/Home'));
const LoginPage = React.lazy(() => import('./components/pages/LoginPage'));
const CreateAccount = React.lazy(() => import('./components/pages/CreateAccount'));
const FilterSearchToile = React.lazy(() => import('./components/pages/FilterSearchToile'));
const RegistrationRestroomPage = React.lazy(() => import('./components/pages/RegistrationRestroomPage'));
const ToiletDetail = React.lazy(() => import('./components/pages/ToiletDetail'));
const MyPage = React.lazy(() => import('./components/pages/MyPage'));
const ContactPage = React.lazy(() => import('./components/pages/ContactPage'));

const GoogleMapsLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isScriptLoaded, setIsScriptLoaded } = useMapState();
  
  useEffect(() => {
    if (isScriptLoaded) return;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.head.appendChild(script);
  }, [isScriptLoaded, setIsScriptLoaded]);

  return <>{isScriptLoaded && children}</>;
};

const MapComponent = React.lazy(() => import('./components/pages/Map'));

const App: React.FC = () => {
  const location = useLocation();

  return (
    <UserProvider>
      <MapStateProvider>
        <Header />
        <AnimatePresence mode="wait">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/CreateAccount" element={<CreateAccount />} />
              <Route path="/FilterSearchToile" element={<FilterSearchToile />} />
              <Route path="/RegistrationRestroom" element={<RegistrationRestroomPage />} />
              <Route path="/toilet/:id" element={<ToiletDetail />} />
              <Route path="/MyPage" element={<MyPage />} />
              <Route path="/map" element={
                <GoogleMapsLoader>
                  <MapComponent />
                </GoogleMapsLoader>
              } />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </MapStateProvider>
    </UserProvider>
  );
};

export default App;
