import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

const avatarPicture = 'https://via.placeholder.com/128';

const ProfileSummary: React.FC = () => {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img
                        src="https://bulma.io/images/placeholders/1280x960.png"
                        alt="Placeholder image"
                    />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img
                                src="https://bulma.io/images/placeholders/96x96.png"
                                alt="Placeholder image"
                            />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">John Smith</p>
                        <p className="subtitle is-6">@johnsmith</p>
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
    return (
        <div className="section">
            <div className="columns container">
                <div className="column is-one-third">
                    <ProfileSummary />
                </div>
                <div className="column">Some information about you</div>
            </div>
        </div>
    );
};

const Profile: React.FC = () => {
    return (
        <>
            <Header />
            <ProfileContent />
            <Footer />
        </>
    );
};

export default Profile;
