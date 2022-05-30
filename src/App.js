

import './App.css';

import { Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from './Components/Header';
import Home from './Pages/Home';
import React, {useState} from 'react';
import Locations from './Pages/Locations';
import Notification from './Components/Notification';
import {useJsApiLoader} from '@react-google-maps/api';


function App() {
  const [Notified, setNotified] = useState({
    completed: false,
    content: null
  })
 const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAmlRtE1Ggrzz-iSUAWGIcm0mmi7GXbKtI',
      libraries: ['places', 'drawing', 'geometry']
  })
  return (
    <div className='App'>
      <Header/>
        <Routes>
          <Route path="/" exact element={<Home isLoaded={isLoaded} />}/>
          <Route path="/locations" element={<Locations isLoaded={isLoaded} setNotified={setNotified} Notified={Notified}/>} />
        </Routes>
      <Notification setNotified={setNotified} onNotified={Notified}/>
    </div>
  );
}

export default App;
