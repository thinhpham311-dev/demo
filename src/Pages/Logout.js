import React from 'react';

const Logout = () => {
    const handleLogout = () => {
        localStorage.clear();
    }
    return (
        <React.Fragment>
            <button type='button' onClick={handleLogout} className='btn btn-danger'>
                Logout
            </button>
        </React.Fragment>
    );
}

export default Logout;
