import React, { useContext } from 'react';
import HomeContent from 'components/Home';
import Profile from 'components/Profile';
import Statistics from 'components/Statistics';
import Report from 'components/Report';
import Login from 'components/Login';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import { IsLoggedInContext } from 'components/IsLoggedInContext';

const Main: React.FC = () => {
    const { isLoggedIn, setLoginStatus } = useContext(IsLoggedInContext);
    return (
        <>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact component={HomeContent} />
                    <Route path="/login" component={Login} />
                    {isLoggedIn && (
                        <Route path="/profile" component={Profile} />
                    )}
                    {isLoggedIn && (
                        <Route path="/statistics" component={Statistics} />
                    )}
                    {isLoggedIn && <Route path="/report" component={Report} />}
                    <Route render={() => <Redirect to="/" />} />
                </Switch>
            </BrowserRouter>
            <Footer />
        </>
    );
};

export default Main;
