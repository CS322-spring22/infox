import logo from './logo.svg';
import './App.css';
import React from 'react';
import Index from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages';
import Settings from './components/pages/settings';
import History from './components/pages/history';
import SignUp from './components/pages/signup';
import SignIn from './components/pages/signin'

function App() {
  return (
    <Router>
      <Index />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/settings" component={Settings} />
        <Route path="/history" component={History} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
