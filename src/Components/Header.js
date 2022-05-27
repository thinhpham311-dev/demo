import React from 'react';
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-black">
                <div className="container">
                        <Link to="/" className='text-uppercase text-decoration-none fw-bold mr-5 text-white'>Manage Location</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                            <li className="nav-item px-3">
                                <Link to="locations" className='text-decoration-none text-white'> Location</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
