import './App.css';
import React from 'react';
import Index from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages';
import SendSummary from './components/pages';
import Settings from './components/pages/settings';
import History from './components/pages/history';
import SignUp from './components/pages/signup';
import SignIn from './components/pages/signin'
import Dashboard from './components/pages/Dashboard';
import Reset from './components/pages/Reset';


function App() {
  return (
    <div className='app'>
      <Router>
        <Index />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/settings" element={Settings} />
          <Route path="/history" element={History} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpass" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
} 

export default App;
