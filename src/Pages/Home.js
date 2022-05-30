/* eslint-disable no-undef */
import React,{useRef} from 'react';
import {
  GoogleMap,
  Polygon,
  Marker
} from '@react-google-maps/api';


//config google map
 const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 40px)'
  };

  const center = {
    lat: 10.3759416,
    lng: 105.4185406
  };

const poly = [{
  "lat": 10.374392428041915,
  "lng": 105.4196684694102
},
  {
    "lat": 10.363923238914904,
    "lng": 105.43400219438578
  },
  {
    "lat": 10.37633425527516,
    "lng": 105.4401820039561
  }];

  
const Home = (props) => {
  const PolygonRef = useRef();
  const checkMarker = (event) => {
    var polygon = new google.maps.Polygon({ paths: poly });
    let result = (google.maps.geometry.poly.containsLocation(event.latLng, polygon) ? "YES" : "NO")
     console.log(result)
  }
  

    return props.isLoaded ? (
      <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
        zoom={15}
      onClick={checkMarker}>
        
        <Polygon path={poly} ref={PolygonRef}  onClick={checkMarker} id="polygon"/>
          <Marker position={{ lat: 10.3716558, lng: 105.4323389 }}/>
      </GoogleMap>
          
        
    ) : (<></>);
}

export default Home;
