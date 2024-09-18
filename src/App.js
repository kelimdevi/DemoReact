import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dept from './Component/Dept';
import Section from './Component/Section';
import './App.css';

function App() {
  return (
    <Router>
      <div className='container shadow m-4 p-5'>
        <nav>
          <ul>
            <li><Link to="/">Departments</Link></li>
            <li><Link to="/sections">Sections</Link></li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<Dept />} />
          <Route path="/sections" element={<Section />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
