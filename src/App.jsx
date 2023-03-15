import React, { useState } from "react";
import { AppContext } from "./variables";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from './pages/Home';
import About from './pages/About';
import Game from './pages/Game';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Profil from './pages/Profil';

// layouts
import RootIndex from './layouts/RootIndex';

function App() {
 
  const [login, setLogin] = useState(false);
  const [reload, setReload] = useState(false);
  const [test, setTest] = useState(false);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ login, setLogin, reload, setReload, test, setTest }}>
        <Routes>
          <Route path="/" element={<RootIndex />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/game" element={<Game />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/registration" element={<Registration />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;