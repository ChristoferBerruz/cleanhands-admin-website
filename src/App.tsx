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

function App() {
  return (
  <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
