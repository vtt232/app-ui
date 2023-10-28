
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { HomePage } from './Page/HomePage';
import { LoginPage } from './Page/LoginPage';


function App() {

  const retrievedData = localStorage.getItem('serverUrl');



  useEffect(() => {
    if (retrievedData !== null) {
      const delayedRedirect = () => {
        window.location.href = "http://localhost:3000/home";
      };
      setTimeout(delayedRedirect, 10000)
        
    }
    else {
      const delayedRedirect = () => {
        window.location.href = "http://localhost:3000/login";
      };
      setTimeout(delayedRedirect, 10000)
    }
  }, []);




    return (
      <BrowserRouter>
          <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          </Routes>
      </BrowserRouter>

  )
}

export default App;
