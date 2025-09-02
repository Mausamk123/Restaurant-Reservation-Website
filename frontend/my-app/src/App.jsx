import "./App.css";
import { Toaster } from 'react-hot-toast';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.jsx"
import Success from "./pages/Success.jsx";
import NotFound from "./pages/NotFound.jsx";
import SearchRestaurants from "./pages/SearchRestaurants.jsx";


const App = () => {
  return <Router>
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/success" element={<Success />} />
  <Route path="/search-restaurants" element={<SearchRestaurants />} />
  <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  
}

export default App

