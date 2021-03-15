import React from 'react';
import {
  BrowserRouter, 
  Route, 
  Switch,
  Redirect
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from 'components/Home';
import Profile from 'components/Profile';
import Statistics from 'components/Statistics';

function App() {
  return (
  <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/statistics" component={Statistics} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
