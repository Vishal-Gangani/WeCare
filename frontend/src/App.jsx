import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Appointment from './pages/Appointment'
import Doctors from './pages/Doctors'
import MyAppointment from './pages/MyAppointment'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div className='mx-4 sm:mx-8 md:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/appointment' element={<MyAppointment />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      
    </div>
  )
}

export default App