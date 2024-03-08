// import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from "./components/Home";
import Forgetpass from "./components/Forgetpass";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/pass" element={<Forgetpass />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
