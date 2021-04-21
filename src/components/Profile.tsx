import React, { useEffect, useState } from 'react';
import {
    getProfile,
    changeName,
    changePassword,
    LoginBody,
} from 'repository/api';
import { AxiosResponse } from 'axios';
import { NavLink } from 'react-router-dom';
import Loading from 'components/Loading';
import { useForm } from 'react-hook-form';

export interface ProfileInfo {
    firstname: string;
    lastname: string;
    email: string;
    organization: string;
}

export interface ProfileSummaryProps {
    info: ProfileInfo;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ info }) => {
    let { firstname, lastname, email, organization } = info;
    return (
        <div className="card">
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">
                            <span>
                                {firstname} {lastname}
                            </span>
                            <span className="icon is-medium is-right">
                                <i className="fas fa-hand-sparkles"></i>
                            </span>
                        </p>

                        <p className="subtitle is-6">{email}</p>
                    </div>
                </div>

                <div className="content">
                    <span>Organization: {organization}</span>
                    <br />
                </div>
            </div>
        </div>
    );
};

const ChangeNameForm: React.FC<ProfileSummaryProps> = ({ info }) => {
    const [firstname, setFirstName] = useState<string>(info.firstname);
    const [lastname, setLastName] = useState<string>(info.lastname);
    const [showSubmit, setShowSubmit] = useState(false);
    const [isLoading, setLoading] = useState(false);

    async function handleSubmit(event: any) {
        event.preventDefault();
        setLoading(true);
        try {
            await changeName(firstname, lastname);
            setFirstName(firstname);
            setLastName(lastname);
            alert('Succesfully update your information!');
            setLoading(false);
        } catch (e) {
            alert(`Something went wrong: ${e}`);
        }
    }

    let FirstNameInput = showSubmit ? (
        <input
            className="input"
            type="text"
            value={firstname}
            onChange={(event) => setFirstName(event.target.value!)}
        />
    ) : (
        <input className="input" type="text" value={firstname} readOnly />
    );

    let LastNameInput = showSubmit ? (
        <input
            className="input"
            type="text"
            value={lastname}
            onChange={(event) => setLastName(event.target.value!)}
        />
    ) : (
        <input className="input" type="text" value={lastname} readOnly />
    );

    let cancelSubmitBtn = showSubmit && (
        <button
            className="button is-danger"
            onClick={() => setShowSubmit(false)}
        >
            Cancel
        </button>
    );

    let editBtn = !showSubmit && (
        <button
            className="button is-primary"
            onClick={() => setShowSubmit(true)}
        >
            Edit fields
        </button>
    );

    let submitBtn =
        showSubmit &&
        (isLoading ? (
            <button className="button is-primary is-loading" type="submit">
                Submit changes
            </button>
        ) : (
            <button className="button is-primary" type="submit">
                Submit changes
            </button>
        ));

    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Firstname</label>
                <div className="control">{FirstNameInput}</div>
            </div>
            <div className="field">
                <label className="label">Lastname</label>
                <div className="control">{LastNameInput}</div>
            </div>
            <div className="buttons">
                {cancelSubmitBtn}
                {submitBtn}
                {editBtn}
            </div>
        </form>
    );
};

const PersonalInfo: React.FC<ProfileSummaryProps> = ({ info }) => {
    return (
        <div className="section">
            <h2 className="title">Personal info</h2>
            <ChangeNameForm info={info} />
        </div>
    );
};

const UpdatePasswordForm: React.FC = () => {
    const { register, handleSubmit } = useForm();
    const [isLoading, setLoading] = useState(false);
    async function onSubmit(data: LoginBody) {
        setLoading(true);
        try {
            await changePassword(data);
            alert('Succesfully updated your password');
            setLoading(false);
        } catch (e) {
            alert(`Please provide a valid current password.`);
        }
    }

    let submitBtn = isLoading ? (
        <button
            className="button is-primary is-normal is-loading"
            type="submit"
        >
            Update password
        </button>
    ) : (
        <button className="button is-primary is-normal" type="submit">
            Update password
        </button>
    );
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label className="label">Current Password</label>
                <div className="control">
                    <input
                        {...register('current_password')}
                        className="input"
                        placeholder="Current password"
                        type="password"
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">New Password</label>
                <div className="control">
                    <input
                        {...register('new_password')}
                        className="input"
                        placeholder="New password"
                        type="password"
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">{submitBtn}</div>
            </div>
        </form>
    );
};

const ChangePassword: React.FC = () => {
    return (
        <div className="section">
            <h2 className="title">Update your password</h2>
            <UpdatePasswordForm />
        </div>
    );
};

const ProfileContent: React.FC = () => {
    const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
    useEffect(() => {
        getProfile()
            .then((res: AxiosResponse) => {
                const userProfile = {
                    firstname: res.data['firstname'],
                    lastname: res.data['lastname'],
                    email: res.data['email'],
                    organization: res.data['organization'],
                };
                setProfileInfo(userProfile);
            })
            .catch((err: any) => {
                alert('Something went wrong..' + err);
            });
    }, []);
    return (
        <div className="section">
            <div className="columns container">
                {!profileInfo ? (
                    <Loading />
                ) : (
                    <>
                        <div className="column is-one-third">
                            <ProfileSummary info={profileInfo!} />
                        </div>
                        <div className="column">
                            <PersonalInfo info={profileInfo!} />
                            <ChangePassword />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const Profile: React.FC = () => {
    return (
        <>
            <ProfileContent />
        </>
    );
};

export default Profile;
