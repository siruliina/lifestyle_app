import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Components
import Navigation from './components/Navigation'
import Home from './components/Home'
import Footer from './components/Footer'
import Login from './components/Login'
import SignUp from './components/SignUp'

const App = () => {

  return (
    <>
      <Router>
        <div>
          <Navigation />
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/about' element={<Home />} />
          <Route path='/contact' element={<Home />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  )
}

export default App
