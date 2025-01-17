import React from 'react'
import HeroSection from '../components/Herosection'
import ServiceCards from '../components/ServiceCards'
import LogoSlider from '../components/LogoSlider'
import Testimonials from '../components/Testimonials'
import ProjectProcess from '../components/ProjectProcess'

function Home() {
  return (
    <div>
        <HeroSection />
        <ServiceCards />
        <LogoSlider />
        <ProjectProcess />
        <Testimonials />
    </div>
  )
}

export default Home