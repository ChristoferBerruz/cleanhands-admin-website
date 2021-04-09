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
import { IsLoggedInContext } from 'components/IsLoggedInContext';

function App() {
    const [isLoggedIn, setLoginStatus] = useState(false);
    const initial = { isLoggedIn, setLoginStatus };
    return (
        <div className="App">
            <IsLoggedInContext.Provider value={initial}>
                <Header />
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={HomeContent} />
                        <Route path="/login" component={Login} />
                        {isLoggedIn && (
                            <Route path="/profile" component={Profile} />
                        )}
                        {isLoggedIn && (
                            <Route path="/statistics" component={Statistics} />
                        )}
                        {isLoggedIn && (
                            <Route path="/report" component={Report} />
                        )}
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </BrowserRouter>
                <Footer />
            </IsLoggedInContext.Provider>
        </div>
    );
}

export default App;
