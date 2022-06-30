

import './App.css';

import { Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from './Components/Header';
import Authmiddleware from './route/route';
import { publicRoute, protectedRoute, isLoaded } from './route';
import React, {useState} from 'react';
import Notification from './Components/Notification';
import { useJsApiLoader } from '@react-google-maps/api';






function App(props) {

  const [Notified, setNotified] = useState({
    completed: false,
    content: null,
    style: null
  })
  const { isLoaded }  = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAmlRtE1Ggrzz-iSUAWGIcm0mmi7GXbKtI',
      libraries: ['places', 'drawing', 'geometry']
  })

  return (
    <div className='App'>
      <Header/>
      <Routes>
        {
          protectedRoute.map((route, index) => 
            <Authmiddleware
                path={route.path}
                element={`<${route.component}/>`}
                isLoaded= {isLoaded}
                key={index}
                isAuthProtected={true}
                exact
            />
            )
        }
        {
          publicRoute.map((route, index) => {
            <Authmiddleware
                path={route.path}
                element={route.component}
                key={index}
                isAuthProtected={false}
                exact
            />
          })
        }
        </Routes>
      <Notification setNotified={setNotified} onNotified={Notified}/>
    </div>
  );
}

export default App;
