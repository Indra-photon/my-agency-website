import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import OurWork from './pages/OurWork'
import { Route, Routes } from 'react-router-dom';
import ContactUs from './pages/ContactUs'
import VideoUploadAdmin from './backend/appwrite/VideoUploadAdmin'
import PhotoUploadAdmin from './backend/appwrite/PhotoUploadAdmin'

function App() {
 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/work' element = {<OurWork />} />
        <Route path = '/contact-us' element = {<ContactUs />} />
        <Route path = '/video-upload' element = {<VideoUploadAdmin />} />
        <Route path = '/photo-upload' element = {<PhotoUploadAdmin />} />


      </Routes>
      <Footer />
    </>
  )
}

export default App
