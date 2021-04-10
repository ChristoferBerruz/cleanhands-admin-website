import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import HomeContent from 'components/Home';
import Profile from 'components/Profile';
import Statistics from 'components/Statistics';
import Report from 'components/Report';
import Login from 'components/Login';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import LoggedInProvider, {
    IsLoggedInContext,
} from 'components/IsLoggedInContext';

function App() {
    return (
        <div className="App">
            <LoggedInProvider>
                <Main />
            </LoggedInProvider>
        </div>
    );
}

export default App;
