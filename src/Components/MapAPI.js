/* eslint-disable array-callback-return */
/* eslint-disable no-undef */

import React, {memo, useRef, useState, useEffect, useCallback} from 'react';
import {
  GoogleMap,
  Marker, 
  InfoWindow,
  DrawingManager,
  Polygon
} from '@react-google-maps/api';
import './style.css';
import api from '../api/CallApi';


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
      todo.id === id ? { ...todo, isOpen: !todo.isOpen } : todo)
    props.setListlocation(toggle)
  }
  google.maps.Polygon.prototype.Contains = function (point) {
    var crossings = 0,
      path = this.getPath();
        
    // for each edge
    for (var i = 0; i < path.getLength(); i++) {
      var a = path.getAt(i),
        j = i + 1;
      if (j >= path.getLength()) {
        j = 0;
      }
      var b = path.getAt(j);
      if (rayCrossesSegment(point, a, b)) {
        crossings++;
      }
    }
    
    // odd number of crossings?
    return (crossings % 2 === 1);

    function rayCrossesSegment(point, a, b) {
      var px = point.lng(),
        py = point.lat(),
        ax = a.lng(),
        ay = a.lat(),
        bx = b.lng(),
        by = b.lat();
      if (ay > by) {
        ax = b.lng();
        ay = b.lat();
        bx = a.lng();
        by = a.lat();
      }
      // alter longitude to cater for 180 degree crossings
      if (px < 0) {
        px += 360;
      }
      if (ax < 0) {
        ax += 360;
      }
      if (bx < 0) {
        bx += 360;
      }

      if (py === ay || py === by) py += 0.00000001;
      if ((py > by || py < ay) || (px > Math.max(ax, bx))) return false;
      if (px < Math.min(ax, bx)) return true;

      var red = (ax !== bx) ? ((by - ay) / (bx - ax)) : Infinity;
      var blue = (ax !== px) ? ((py - ay) / (px - ax)) : Infinity;
      return (blue >= red);

    }
    
  }
  const CreatePolygon = useCallback((Polygon) => {
      let path =  Polygon.getPath();
      let polygonCoords = [];
  
      for (let i = 0; i < path.length; i++) {
        polygonCoords.push({
            lat: path.getAt(i).lat(),
            lng: path.getAt(i).lng(),
        });
    }
    var check = false;
    props.listlocation.map((items, index) => {
      var marker = new google.maps.Marker({
        position: {
          lat: items.lat,
          lng: items.lng
        },
      });
      if (Polygon.Contains(marker.getPosition())) {
        check = true;
          return check;
        }
    });

    if (check) {
      api('add/polygon', 'POST', {
        name: 'point',
        point: JSON.stringify(polygonCoords),
      });
      props.setNotified({
        completed: true,
        content: 'Thêm khu vực thành công',
        style: null
      })
      return;
    } else {
      props.setNotified({
          completed: true,
          content: 'Khu vực này không có location',
          style: null
        })
      Polygon.setMap(null)
      return;
    }
    
  }, [props])
 
  const handleDelete = (id) => {
      if (id) {
        api(`delete/polygon/${id}`, 'DELETE', null)
      }
      const deleteitems = Coords.filter(todo => todo.id !== id);
      setCoords(deleteitems);
      props.setNotified(
      {
        completed: true,
          content: 'Xóa khu vuc thành công',
        style: null
      }
    )
    
  }

 
  return  (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
    >
        {
          Coords.map(items=> 
            <Polygon
              onDblClick={() => handleDelete(items.id)}
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