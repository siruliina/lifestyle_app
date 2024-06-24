import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Components
import Navigation from './components/Navigation'
import Home from './components/Home'
import Footer from './components/Footer'

const App = () => {

  return (
    <>
      <Router>
        <div>
          <Navigation />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  )
}

export default App
