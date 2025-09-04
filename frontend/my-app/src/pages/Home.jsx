import React from 'react'
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import Qualities from '../components/Qualities';
import Menu from '../components/Menu';
import WhoWeAre from '../components/WhoWeAre';
import Team from '../components/Team';
import Reservation from '../components/Reservation';
import Footer from "../components/Footer";
import UserDropdown from "./UserDropdown";
const Home = () => {
  return (
    <>
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      background: "rgba(255,255,255,0.95)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      zIndex: 100,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2.5rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <span style={{ fontWeight: 800, fontSize: 22, color: "#ff914d", letterSpacing: 1 }}>HAPPY</span>
        <button
          onClick={() => window.location.href = "/"}
          style={{ padding: "0.5rem 1.2rem", background: "#fff", color: "#ff914d", border: "2px solid #ff914d", borderRadius: 8, fontWeight: 700, cursor: "pointer", boxShadow: "0 1px 6px rgba(255,145,77,0.08)" }}
        >
          Home
        </button>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <UserDropdown />
      </div>
    </div>
    <HeroSection />
    <About />
    <Qualities />
    <Menu />
    <WhoWeAre />
    <Team/>
    {/* <Reservation/> */}
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
        onClick={() => window.location.href = "/order-now"}
      >
        Order Now
      </button>
    </div>
    </>
      
  )
}

export default Home
