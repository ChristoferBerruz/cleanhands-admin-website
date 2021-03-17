import React from 'react';
import logo from 'assets/cleanhands-logo.png';

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
                        <a className="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a className="button is-light">Log in</a>
                    </div>
                </div>
            </div>
        </div>
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
