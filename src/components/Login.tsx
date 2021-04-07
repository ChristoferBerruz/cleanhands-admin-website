import React from 'react';
import { tryLogin, LoginBody } from 'repository/api';
import { useForm } from 'react-hook-form';

const Login: React.FC = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => alert(JSON.stringify(data));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="section">
                <div className="columns container">
                    <div className="column is-one-third">
                        <div className="field">
                            <p>Email</p>
                            <p className="control has-icons-left has-icons-right">
                                <input
                                    {...register('email')}
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
                                    {...register('password')}
                                    className="input"
                                    type="password"
                                    placeholder="Password"
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-link"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;
