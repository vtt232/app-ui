
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { HomePage } from './Page/HomePage';
import { WelcomePage } from './Page/WelcomePage';
import {RepoListPage} from './Page/RepoListPage';
import { AdminPage } from './Page/AdminPage';
import { SystemInforPage } from './Page/SystemInforPage';




function App() {





    return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<WelcomePage/>}/>
          <Route path="/home" element={<HomePage/>} />
          <Route path="/repo-list" element={<RepoListPage/>}/>
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/system-infor" element={<SystemInforPage/>} />
        </Routes>
      </BrowserRouter>

  )
}

export default App;
