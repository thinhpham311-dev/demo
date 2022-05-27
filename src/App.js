
import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from './Components/Header';
import Home from './Pages/Home';
import Locations from './Pages/Locations';


function App() {
  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </div>
  );
}

export default App;
