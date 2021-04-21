import React, { useState } from 'react';
import { getProfile, changeName } from 'repository/api';
import { AxiosResponse } from 'axios';
import { NavLink } from 'react-router-dom';
import Loading from 'components/Loading';

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

const ShowChangeName: React.FC<ProfileSummaryProps> = ({ info }) => {
    const [firstname, setFirstName] = useState<string>(info.firstname);
    const [lastname, setLastName] = useState<string>(info.lastname);
    const [showSubmit, setShowSubmit] = useState(false);

    async function handleSubmit(event: any) {
        event.preventDefault();
        try {
            await changeName(firstname, lastname);
            setFirstName(firstname);
            setLastName(lastname);
            alert('Succesfully update your information!');
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
        <button className="button" onClick={() => setShowSubmit(false)}>
            Cancel
        </button>
    );

    let editBtn = !showSubmit && (
        <button className="button" onClick={() => setShowSubmit(true)}>
            Edit fields
        </button>
    );

    let submitBtn = showSubmit && (
        <button className="button" type="submit">
            Submit changes
        </button>
    );

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
            {cancelSubmitBtn}
            {submitBtn}
            {editBtn}
        </form>
    );
};

const ProfileContent: React.FC = () => {
    const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
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
                            <ShowChangeName info={profileInfo!} />
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
