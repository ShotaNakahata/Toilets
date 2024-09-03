// //frontend/App.tsx
// import React, { useState } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import { AnimatePresence } from 'framer-motion';
// import Header from './components/layout/Header';
// import Home from './components/pages/Home';
// import LoginPage from './components/pages/LoginPage';
// import CreateAccount from './components/pages/CreateAccount';
// import FilterSearchToile from './components/pages/FilterSearchToile';
// import RegistrationRestroomPage from './components/pages/RegistrationRestroomPage';
// import { UserProvider } from './context/UserContext';
// import { MapStateProvider } from './context/MapStateContext'; 
// import ToiletDetail from './components/pages/ToiletDetail';
// import MyPage from './components/pages/MyPage';
// import ContactPage from './components/pages/ContactPage';
// import Map from './components/pages/Map';
// import { Toilet } from './interfaces/Toilet_Interfaces';
// // import "./types/markerclusterer-override"


// const App: React.FC = () => {
//   const [newToilets, setNewToilets] = useState<Toilet[]>([]);
//   const location = useLocation(); // useLocation はそのまま使う

//   const handleNewToilet = (toilet: Toilet) => {
//     setNewToilets(prevToilets => [...prevToilets, toilet]);
//   };

//   return (
//     <UserProvider>
//       <MapStateProvider>
//         <Header />
//         <AnimatePresence mode="wait"> {/* 修正点 */}
//           <Routes location={location} key={location.pathname}>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/CreateAccount" element={<CreateAccount />} />
//             <Route path="/FilterSearchToile" element={<FilterSearchToile />} />
//             <Route path="/RegistrationRestroom" element={<RegistrationRestroomPage />} />
//             <Route path="/toilet/:id" element={<ToiletDetail />} />
//             <Route path="/MyPage" element={<MyPage />} />
//             <Route path="/map" element={<Map />} />
//             <Route path="/contact" element={<ContactPage />} />
//           </Routes>
//         </AnimatePresence>
//       </MapStateProvider>
//     </UserProvider>
//   );
// };

// export default App;

///---------------------------------------------------------------------
// import React, { Suspense } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import { AnimatePresence } from 'framer-motion';
// import Header from './components/layout/Header';
// import { UserProvider } from './context/UserContext';
// import { MapStateProvider } from './context/MapStateContext'; 

// // Homeコンポーネントを遅延読み込みする
// const Home = React.lazy(() => import('./components/pages/Home'));
// const LoginPage = React.lazy(() => import('./components/pages/LoginPage'));
// const CreateAccount = React.lazy(() => import('./components/pages/CreateAccount'));
// const FilterSearchToile = React.lazy(() => import('./components/pages/FilterSearchToile'));
// const RegistrationRestroomPage = React.lazy(() => import('./components/pages/RegistrationRestroomPage'));
// const ToiletDetail = React.lazy(() => import('./components/pages/ToiletDetail'));
// const MyPage = React.lazy(() => import('./components/pages/MyPage'));
// const ContactPage = React.lazy(() => import('./components/pages/ContactPage'));
// const Map = React.lazy(() => import('./components/pages/Map'));

// const App: React.FC = () => {
//   const location = useLocation();

//   return (
//     <UserProvider>
//       <MapStateProvider>
//         <Header />
//         <AnimatePresence mode="wait">
//           <Suspense fallback={<div>Loading...</div>}>
//             <Routes location={location} key={location.pathname}>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/CreateAccount" element={<CreateAccount />} />
//               <Route path="/FilterSearchToile" element={<FilterSearchToile />} />
//               <Route path="/RegistrationRestroom" element={<RegistrationRestroomPage />} />
//               <Route path="/toilet/:id" element={<ToiletDetail />} />
//               <Route path="/MyPage" element={<MyPage />} />
//               <Route path="/map" element={<Map />} />
//               <Route path="/contact" element={<ContactPage />} />
//             </Routes>
//           </Suspense>
//         </AnimatePresence>
//       </MapStateProvider>
//     </UserProvider>
//   );
// };

// export default App;

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
