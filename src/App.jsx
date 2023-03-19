import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { AppContext } from "./variables";

// pages
import Home from './pages/Home';
import About from './pages/About';
import Game from './pages/Game';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Profil from './pages/Profil';
import Admin from './pages/Admin';

// layouts
import RootIndex from './layouts/RootIndex';

function App() {
 
  const [cookies, setCookie] = useCookies(['login']);
  
  const [user, setUser] = useState({});
  const [reload, setReload] = useState(false);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ user, setUser, reload, setReload, cookies, setCookie }}>
        <Routes>
          <Route path="/" element={<RootIndex />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/game" element={<Game />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;