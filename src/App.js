import React, { useState } from 'react';
import GamesPlayground from './pages/GamesPlayground';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer'
import PCGames from './components/PCGames'; // Import the PCGames component
import AboutUs from './components/AboutUs'; // Import the AboutUs component
import Contact from './components/Contact'; // Import the Contact component
import './App.css'; // Your provided CSS styles

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={`playground-container ${darkMode ? 'dark-mode' : ''}`}>
        <Routes>
          <Route path="/" element={<GamesPlayground />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pc-games" element={<PCGames />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
