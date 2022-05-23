import './App.css';
import React from 'react';
import Index from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages';
import SendSummary from './components/pages';
import Settings from './components/pages/Settings/settings';
import History from './components/pages/history';
import SignUp from './components/pages/signup';
import SignIn from './components/pages/signin'
import Dashboard from './components/pages/Dashboard';
import Reset from './components/pages/Reset';
import General from './components/pages/Settings/general';
import Profile from './components/pages/Settings/profile';
import Instructions from './components/pages/instructions';

function App() {
  return (
    <div className='app'>
      <Router>
        <Index />
        <Routes>
          <Route path="/" exact element={<SendSummary />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/history" element={<History />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpass" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/general" element={<General />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/instructions" element={<Instructions />} />
        </Routes>
      </Router>
    </div>
  );
} 

export default App;
