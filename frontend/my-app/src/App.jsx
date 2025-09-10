import "./App.css";
import { Toaster } from 'react-hot-toast';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.jsx"
import Success from "./pages/Success.jsx";
import NotFound from "./pages/NotFound.jsx";
import SearchRestaurants from "./pages/SearchRestaurants.jsx";
import OrderNow from "./pages/OrderNow.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";


const App = () => {
   return <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/success" element={<Success />} />
  <Route path="/search-restaurants" element={<SearchRestaurants />} />
  <Route path="/order-now" element={<OrderNow />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    

    
}

export default App

