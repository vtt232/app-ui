
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { HomePage } from './Page/HomePage';
import { WelcomePage } from './Page/WelcomePage';
import {RepoListPage} from './Page/RepoListPage'
import { NoteListPage } from './Page/NoteListPage';



function App() {



    return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<WelcomePage/>}/>
          <Route path="/home" element={<HomePage />} />
          <Route path="/repo-list" element={<RepoListPage/>}/>
          <Route path="/repo/:id" element={<NoteListPage/>} />
        </Routes>
      </BrowserRouter>

  )
}

export default App;
