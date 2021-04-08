import React, { useState, useContext } from 'react';
import logo from 'assets/cleanhands-logo.png';
import { IsLoggedInContext } from 'components/IsLoggedInContext';

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
                <a className="navbar-item" href="/">
                    Home
                </a>

                <a className="navbar-item" href="/report">
                    Report
                </a>

                <a className="navbar-item" href="/statistics">
                    Statistics
                </a>

                <a className="navbar-item" href="/profile">
                    Profile
                </a>
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
    return !isLoggedIn ? (
        <a className="button is-light" href="/login">
            Log in
        </a>
    ) : (
        <a className="button is-light" href="/login">
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
