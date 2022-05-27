import React, { useState, useEffect } from 'react';
import {useJsApiLoader} from '@react-google-maps/api';
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import MapAPI from '../Components/MapAPI';
import { v4 } from 'uuid';
import  api  from '../api/CallApi';
import InforLocation from '../Components/InforLocation';
import Notification from '../Components/Notification';

const Locations = () => {
  const [address, setAddress] = useState("");
  const [listlocation, setListlocation] = useState([]);
  const [listViewlocation, setListViewlocation] = useState({});
  const [Notified, setNotified] = useState({
    completed: false,
    content: null
  })
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAmlRtE1Ggrzz-iSUAWGIcm0mmi7GXbKtI",
      libraries: ['places', 'drawing']
  })

  useEffect(() => {
    api('locations', 'GET', null)
      .then(res =>
        setListlocation(res.data))
      .catch(error => console.log(error))
   
  }, [setListlocation])
  
  const handleSelect = async value => {
    const result = await geocodeByAddress(value);
    const ll = await getLatLng(result[0]);
      const location = ([
        ...listlocation, {
          id: v4(),
          address: result[0].formatted_address,
          lat: ll.lat,
          lng: ll.lng,
          isOpen: false,
          isToggle: false,
    }]);
    api('add/locations', 'POST', {
        address: result[0].formatted_address,
        lat: ll.lat,
        lng: ll.lng
    })
    setListlocation(location)
    setNotified(
      {
        completed: true,
        content: 'Thêm thành công'
      }
    )
  }

  const HandleDelete = (id) => {
    if (id) {
      api(`delete/locations/${id}`, 'DELETE', null)
    }
    const deleteitems = listlocation.filter(todo => todo.id !== id);
    setListlocation(deleteitems);
    setNotified(
      {
        completed: true,
        content: 'Xóa thành công'
      }
    )
  }
  
  const DisplayInfo = (id, {...param }) => {
    listlocation.map((todo) => {
      if (todo.id === id) {
        setListViewlocation({
          address: param.address,
          lat: param.lat,
          lng: param.lng,
          isToggle: !todo.isToggle
        })
      }
    })
  }


  return isLoaded ? (
      <div className='container'>
        <div className='row'>
          <div className='col-3 py-5'>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect} >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className='position-relative'>
                    <label htmlFor="location" className='fw-bold'>Select location:</label>
                    <input
                      {...getInputProps({
                        placeholder: 'Search Location ...',
                        className: 'location-search-input form-control',
                      })} id="location"/>
                    <div className="autocomplete-dropdown-container position-absolute w-100">
                      {loading && <div style={{backgroundColor: '#ffffff'}}>Loading...</div>}
                      {suggestions.map((suggestion, index) => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#cdcdcd', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                            key={index}
                          >
                            <div  className='d-flex align-items-start justify-content-start py-2'>

                              <i className="bi bi-geo-alt px-3"></i><span>{suggestion.description}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            <div className='mt-5'>
              <InforLocation listViewlocation={listViewlocation}
               />
            </div>
          </div>
          <div className='col-9'>
            <MapAPI listlocation={listlocation}
                    onHandleDelete={HandleDelete}
                    setListlocation={setListlocation}
                    onDisplayInfo={DisplayInfo}/>
          </div>
      </div>
      <Notification onNotified={Notified} setNotified={setNotified} />
  </div>
    ) : (<></>);
}

export default Locations;