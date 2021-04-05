import React from 'react';

const HomeContent: React.FC = () => {
    return (
        <div className="hero">
            <div className="hero-body">
                <p className="title">Cleanhands</p>
                <p className="subtitle">Hero subtitle</p>
            </div>
        </div>
    );
};
export default HomeContent;

const Home: React.FC = () => {
    return (
        <>
            <HomeContent />
        </>
    );
};
