import React, { useState, useContext } from 'react';
import logo from 'assets/cleanhands-logo.png';
import { IsLoggedInContext } from 'components/IsLoggedInContext';
import { tryLogout } from 'repository/api';
import { AxiosResponse } from 'axios';
import { useHistory, Link } from 'react-router-dom';

const navbarMenuID = 'navbarMenu';

const Brand: React.FC = () => {
    return (
        <div className="navbar-brand">
            <a className="navbar-item" href="/">
                <img src={logo} width="112" height="48" />
            </a>

            <a
                role="button"
                className="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target={navbarMenuID}
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
    );
};

const Tabs: React.FC = () => {
    return (
        <div id={navbarMenuID} className="navbar-menu">
            <div className="navbar-start">
                <Link className="navbar-item" to="/">
                    Home
                </Link>

                <Link className="navbar-item" to="/report">
                    Report
                </Link>

                <Link className="navbar-item" to="/statistics">
                    Statistics
                </Link>

                <Link className="navbar-item" to="/profile">
                    Profile
                </Link>
            </div>

            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <LoginOrLogoutButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

const LoginOrLogoutButton: React.FC = () => {
    const { isLoggedIn, setLoginStatus } = useContext(IsLoggedInContext);
    const logout = (e: any): void => {
        tryLogout()
            .then((res: AxiosResponse) => {
                setLoginStatus(false);
            })
            .catch((err: any) => {
                alert('Something went wrong..' + err);
            });
    };
    return !isLoggedIn ? (
        <a className="button is-light" href="/login">
            Log in
        </a>
    ) : (
        <a className="button is-light" onClick={logout}>
            Logout
        </a>
    );
};

const Header: React.FC = () => {
    return (
        <nav
            className="navbar is-primary"
            role="navigation"
            aria-label="main navigation"
        >
            <Brand />
            <Tabs />
        </nav>
    );
};

export default Header;
