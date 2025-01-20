import React from 'react'
import HeroSection from '../components/Herosection'
import ServiceCards from '../components/ServiceCards'
import LogoSlider from '../components/LogoSlider'
import Testimonials from '../components/Testimonials'
import ProjectProcess from '../components/ProjectProcess'

function Home() {
  return (
    <div className='w-full'>
      <section>
        <HeroSection />
        <ServiceCards />
        <LogoSlider />
        <ProjectProcess />
        <Testimonials />
      </section>
    </div>
  )
}

export default Home