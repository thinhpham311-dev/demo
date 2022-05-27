import React, {memo, useRef, useState, useCallback, useEffect} from 'react';
import {
  GoogleMap,
  Marker, 
  InfoWindow,
  DrawingManager,
  Polygon
} from '@react-google-maps/api';
import './style.css';
import CallApi from '../api/CallApi';



  const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 40px)'
  };

  const center = {
    lat: 10.3759416,
    lng: 105.4185406
  };

  const optionsPolygon = {
  fillColor: "lightblue",
  fillOpacity: 1,
  strokeColor: "black",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1
}

  const MapAPI = (props) => {
  const [Coords, setCoords] = useState([]);
    const MarkerRef = useRef();
    
  useEffect(() => {
    CallApi('polygon', 'GET', null).then(res => 
    {
      setCoords(res.data)
    }).catch(err => console.log(err))
  }, []);

  const TogglePopupOpen = (id) => {
    const toggle = [...props.listlocation].map(todo => 
      todo.id === id ? {...todo, isOpen: !todo.isOpen} : todo)
      props.setListlocation(toggle)
  }
 
  const CreatePolygon = useCallback((Polygon) => {
    let path = Polygon.getPath();
    let polygonCoords = [];

    for (let i = 0; i < path.length; i++) {
      polygonCoords.push({
          lat: path.getAt(i).lat(),
          lng: path.getAt(i).lng(),
      });
    }
    
    setCoords(polygonCoords)

  }, [])
  
    console.log(Coords)
  return  (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
    >
        <Polygon
          paths={Coords}
          options={optionsPolygon}/>
        <DrawingManager
          setMap={GoogleMap}
          onPolygonComplete={CreatePolygon}
          options={{
            drawingControl: true,
            drawingControlOptions: {
            // eslint-disable-next-line no-undef
            position: google.maps.ControlPosition.TOP_RIGHT,
            // eslint-disable-next-line no-undef
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
          },
          polygonOptions: { editable: true }
        }}
        />
        {
          props.listlocation.map(items =>
            <Marker
                  key={items.id}
                  position={{ lat: items.lat, lng: items.lng }}
                  title={items.address}
                  ref={MarkerRef}
                  onClick={() => TogglePopupOpen(items.id)}>
                  {
                    items.isOpen && (
                      <InfoWindow>
                        <div className='row g-0' style={{'width': '250px'}}>
                            <div className='col-12 py-3'>
                              {items.address}
                          </div>
                          <div className='col-6'>
                            <button type='button'
                              onClick={() => props.onHandleDelete(items.id)}
                              className='btn btn-danger w-100'
                            >Delete</button>
                          </div>
                          <div className='col-6'>
                            <button type='button'
                                className='btn btn-warning w-100'
                                onClick={() => props.onDisplayInfo(items.id,{ address: items.address, lat: items.lat, lng: items.lng })}>
                            View
                            </button>
                          </div>
                        </div>
                      </InfoWindow>
                    )
                  }
            </Marker>
          )
        }
      </GoogleMap>
  ) 
}

export default memo(MapAPI);

