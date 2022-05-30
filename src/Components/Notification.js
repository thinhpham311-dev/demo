import React from 'react';

const Notification = (props) => {
    setTimeout(()=>props.setNotified({
        completed: false,
        content: props.onNotified.content
    }), 10000)
    return (
        <div className='position-fixed bottom-0 right-0'>
            <div className="show toast"
                style={props.onNotified.completed ?
                    { 'opacity': '1', 'transition': 'all 0.5s' } :
                    { 'opacity': '0', 'transition': 'all 0.5s' }}
                role="alert"
                aria-live="assertive"
                aria-atomic="true">
                <button type="button"
                    className="btn-close"
                    onClick={() => props.setNotified(!props.onNotified.completed)}
                    data-bs-dismiss="toast"
                    aria-label="Close">
                </button>
                <div className="toast-body">
                   {props.onNotified.content}
                </div>
            </div>
        </div>
    );
}

export default Notification;