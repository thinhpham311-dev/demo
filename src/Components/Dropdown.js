import React, {useState, useEffect} from 'react';
import Logout from '../Pages/Logout';
import { Link, useHistory } from 'react-router-dom';
import './style.css'

const Dropdown = () => {
    const [toggle, setToggle] = useState(false);
    const history = useHistory();
    const [info, setInfo] = useState(null);
    useEffect(() => {
        const displayInfo = JSON.parse(localStorage.getItem('authUser'));
        setInfo(displayInfo)
        return () => {
            setToggle(false)
        }
    }, []);
    const handleLogout = () => {
        history.push('/login');
        setInfo(null)
        localStorage.clear();
    }
  
    return (
        <React.Fragment>
            {
                info !== null ? 
            <div className="nav-item dropdown">
                <button type="button" onClick={()=>setToggle(!toggle)} className="nav-link btn-dark dropdown-toggle"  >
                {info.username}
                </button>
                <ul className={toggle ? "dropdown-menu display" : "dropdown-menu"} >
                    <li><Link to="" className="dropdown-item" >Profile</Link></li>
                    <li><button type='button' onClick={handleLogout} className="dropdown-item" >Logout</button></li>
                </ul>
            </div> : <></>
            }
        </React.Fragment>
    );
}

export default Dropdown;
