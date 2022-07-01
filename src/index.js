import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './Components/Header';
  import {
  BrowserRouter

} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
    <React.Fragment>
      <Header/>
      <App />
      </React.Fragment>
   </BrowserRouter>

);


