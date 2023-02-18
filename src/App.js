import { createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
 } from 'react-router-dom'

import './App.css';

// pages
import Home from './pages/Home';
import About from './pages/About';
import Game from './pages/Game';
import Login from './pages/Login';

// layouts
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={ <RootLayout /> }>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="game" element={<Game />} />
      <Route path="login" element={<Login />} />
    </Route>
    )
)

function App() {
    return ( 
      <RouterProvider router={router} />
    );
}

export default App;