import React from 'react'
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import Qualities from '../components/Qualities';
import Menu from '../components/Menu';
import WhoWeAre from '../components/WhoWeAre';
import Team from '../components/Team';
import Reservation from '../components/Reservation';
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
    <HeroSection />
    <About />
    <Qualities />
    <Menu />
    <WhoWeAre />
    <Team/>
    <Reservation/>
    <Footer/>
    <div style={{ textAlign: "center", margin: "2rem 0" }}>
      <button
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          background: "#ff914d",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
        onClick={() => window.location.href = "/search-restaurants"}
      >
        Reserve
      </button>
    </div>
    </>
      
  )
}

export default Home
