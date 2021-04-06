import React from 'react';

const Login: React.FC = () => {
    return (
        <div className="section">
            <div className="columns container">
                <div className="column is-one-third">
                    <div className="field">
                        <p>Email</p>
                        <p className="control has-icons-left has-icons-right">
                            <input
                                className="input"
                                type="email"
                                placeholder="Email"
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p>Password</p>
                        <p className="control has-icons-left">
                            <input
                                className="input"
                                type="password"
                                placeholder="Password"
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
