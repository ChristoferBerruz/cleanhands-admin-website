import React from 'react';
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
import LoggedInProvider from 'components/IsLoggedInContext';

function App() {
    return (
        <div className="App">
            <LoggedInProvider>
                <Header />
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={HomeContent} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/statistics" component={Statistics} />
                        <Route path="/report" component={Report} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </BrowserRouter>
                <Footer />
            </LoggedInProvider>
        </div>
    );
}

export default App;
