/* eslint-disable no-undef */
import React, {memo, useRef, useState, useEffect} from 'react';
import {
  GoogleMap,
  Marker, 
  InfoWindow,
  DrawingManager,
  Polygon
} from '@react-google-maps/api';
import './style.css';
import api from '../api/CallApi';
import { v4 } from 'uuid';

//Config Map 
 const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 40px)'
  };

  const center = {
    lat: 10.3759416,
    lng: 105.4185406
  };

  const MapAPI = (props) => {
  const [Coords, setCoords] = useState([]);
    const PolygonRef = useRef();
  useEffect(() => {
    api('polygon', 'GET', null)
      .then(res =>
        setCoords(res.data))
      .catch(error => console.log(error))
  
  }, [setCoords])
  const TogglePopupOpen = (id) => {
    const toggle = [...props.listlocation].map(todo => 
      todo.id === id ? {...todo, isOpen: !todo.isOpen} : todo)
      props.setListlocation(toggle)
  }
 
    const CreatePolygon = async (Polygon) => {
    
    let path = await Polygon.getPath();
    let polygonCoords = [];
 
    for (let i = 0; i < path.length; i++) {
      polygonCoords.push({
          lat: path.getAt(i).lat(),
          lng: path.getAt(i).lng(),
      });
    }
    api('add/polygon', 'POST', {
      name: 'point',
      point: JSON.stringify(polygonCoords),
    })
      
      window.google.maps.event.addListener(Polygon, 'click', function (event) {
        debugger
          if (Polygon.Contains(event.latLng)) {
              alert(event.latLng + " Inside Polygon.");
          } else {
              alert(event.latLng + " Outside Polygon.");
          }
      });
     setCoords([
      ...Coords, 
      {
        id: v4(),
        point: polygonCoords,
      }
     ])
   
    props.setNotified(
      {
        completed: true,
        content: 'Thêm khu vực thành công'
      }
    )
  }

  const handleDelete = (id) => {
    if (id) {
      api(`delete/polygon/${id}`, 'DELETE', null)
    }
    const deleteitems = Coords.filter(todo => todo.id !== id);
    setCoords(deleteitems);
    props.setNotified(
      {
        completed: true,
        content: 'Xóa khu vuc thành công'
      }
    )
    
    }
    
   const checkMarker = (event) => {
    var polygon = new google.maps.Polygon({ paths: center });
    let result = (google.maps.geometry.poly.containsLocation(event.latLng, polygon) ? "YES" : "NO")
     console.log(result)
  }
 
  return  (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onClick={checkMarker}
    >
        {
          Coords.map(items=> 
            <Polygon
              onDblClick={() => handleDelete(items.id)}
              onClick={checkMarker}
              key={items.id}
              // eslint-disable-next-line no-eval
              paths={eval(items.point)}
              ref={PolygonRef}/>
          )
        }
       
        <DrawingManager
          setMap={GoogleMap}
          onPolygonComplete={(e)=>CreatePolygon(e)}
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