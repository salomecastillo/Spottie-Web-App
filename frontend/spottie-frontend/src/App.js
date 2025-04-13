// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Optional

import Home from './pages/Home';
import Scan from './pages/Scan';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
