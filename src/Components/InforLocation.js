import React from 'react';

const InforLocation = (props) => {
   
    return (
        <>
            <div>
                <h2>Infomation location</h2>
                <p>Location address: {props.listViewlocation.address}</p>
                <p>lat: {props.listViewlocation.lat}</p>
                <p>lng: {props.listViewlocation.lng}</p>
            </div>
        </>
    );
}

export default InforLocation;
