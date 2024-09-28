import React, { useState } from 'react';
import GamesPlayground from './pages/GamesPlayground';
import Footer from './components/Footer'
import './App.css'; // Your provided CSS styles

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`playground-container ${darkMode ? 'dark-mode' : ''}`}>
      <GamesPlayground />
      <Footer />
    </div>
  );
}

export default App;
