import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

// pages
import Home from './pages/Home';
import About from './pages/About';
import Game from './pages/Game';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import Registration from './pages/Registration';

// layouts
import RootIndex from './layouts/RootIndex';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootIndex />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/game" element={<Game />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/registration" element={<Registration />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;