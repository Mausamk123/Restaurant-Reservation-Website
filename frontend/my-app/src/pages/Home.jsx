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
    </>
      
  )
}

export default Home
