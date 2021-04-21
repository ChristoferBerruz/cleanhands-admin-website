import React, { useState } from 'react';
import { getProfile } from 'repository/api';
import { AxiosResponse } from 'axios';
import { NavLink } from 'react-router-dom';

export interface ProfileInfo {
    firstname: string;
    lastname: string;
    email: string;
    organization: string;
}

const ProfileSummary: React.FC<ProfileInfo> = ({info: ProfileInfo) => {
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br />
                </div>
            </div>
        </div>
    );
};

const ProfileContent: React.FC = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrg] = useState('');
    let profile = {
        firstname,
        lastname,
        email,
        organization,
    };
    getProfile()
        .then((res: AxiosResponse) => {
            setFirstName(res.data['firstname']);
            setLastName(res.data['lastname']);
            setEmail(res.data['email']);
            setOrg(res.data['organization']);
        })
        .catch((err: any) => {
            alert('Something went wrong..' + err);
        });
    return (
        <div className="section">
            <div className="columns container">
                <div className="column is-one-third">
                    <ProfileSummary info={profile} />
                </div>
                <div className="column">Some information about you</div>
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
