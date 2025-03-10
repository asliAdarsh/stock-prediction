import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import './App.css';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header onLoginClick={() => setShowLoginModal(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      </div>
    </Router>
  );
}

export default App;