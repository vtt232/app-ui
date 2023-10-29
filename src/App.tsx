
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { HomePage } from './Page/HomePage';
import { LoginPage } from './Page/LoginPage';
import { WelcomePage } from './Page/WelcomePage';
import {NotePage} from './Page/NotePage'



function App() {



    return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<WelcomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage />} />
          <Route path="/note" element={<NotePage/>}/>
          </Routes>
      </BrowserRouter>

  )
}

export default App;
