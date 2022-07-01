

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { publicRoute, protectedRoute } from './route';
import { Switch } from 'react-router-dom';
import React, {useState} from 'react';
import Notification from './Components/Notification';
import { useJsApiLoader } from '@react-google-maps/api';
import AuthmiddlewareRoute from './route/route';

function App() {

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
    <React.Fragment>
      <Switch>
        {publicRoute.map((route, idx) => (
          <AuthmiddlewareRoute
            path={route.path}
            component={route.component}
            key={idx}
            isAuthProtected={false}
            exact
            setNotified={setNotified} onNotified={Notified}
          />
        ))}

        {protectedRoute.map((route, idx) => (
          <AuthmiddlewareRoute
            path={route.path}
            component={route.component}
            key={idx}
            isAuthProtected={true}
            exact
            isLoaded={isLoaded} setNotified={setNotified} onNotified={Notified}
          />
        ))}
        </Switch>
      <Notification setNotified={setNotified} onNotified={Notified}/>
    </React.Fragment>
  );
}


export default App;
