import React from 'react';

const InforMaker = (props) => {
   
    return (
        <>
            <div>
                <h2>Marker:</h2>
                <p>Location address: {props.listViewlocation.address}</p>
                <p>lat: {props.listViewlocation.lat}</p>
                <p>lng: {props.listViewlocation.lng}</p>
            </div>
        </>
    );
}

export default InforMaker;
