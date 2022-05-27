import React from 'react';

const Notification = (props) => {
  
    return (
        <div className='position-fixed bottom-0 right-0'>
            <div className="show toast" style={props.onNotified.completed ? { 'display':'block'}: {'display':'none'}} role="alert" aria-live="assertive" aria-atomic="true">
                <button type="button" className="btn-close" onClick={()=>props.setNotified(!props.onNotified.completed)}  data-bs-dismiss="toast" aria-label="Close"></button>
                <div className="toast-body">
                   {props.onNotified.content}
                </div>
            </div>
        </div>
    );
}

export default Notification;
