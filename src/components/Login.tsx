import React, { useContext } from 'react';
import { tryLogin, LoginBody } from 'repository/api';
import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';
import { IsLoggedInContext } from 'components/IsLoggedInContext';

const Login: React.FC = () => {
    let history = useHistory();
    const { register, handleSubmit } = useForm();
    const { isLoggedIn, setLoginStatus } = useContext(IsLoggedInContext);
    const onSubmit = (data: LoginBody) => {
        tryLogin(data)
            .then((res: AxiosResponse) => {
                setLoginStatus(true);
                history.push('/profile');
            })
            .catch((err: any) => {
                alert('Something went wrong..' + err);
            });
    };

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
