import React from 'react';
import endHandwashing from 'assets/End Handwashing.jpg';
import startHandwashing from 'assets/Start Handwashing.jpg';
import wristAppears from 'assets/Wrist Appears.jpg';
import wristDisappears from 'assets/Wrist Disappears.jpg';

const HandwashingCard: React.FC<{ imagePath: string; description: string }> = ({
    imagePath,
    description,
}) => {
    return (
        <div className="box">
            <figure className="image">
                <img src={imagePath} />
            </figure>
            <p>{description}</p>
        </div>
    );
};

const HandwashingCards: React.FC = () => {
    const images = [
        wristAppears,
        startHandwashing,
        endHandwashing,
        wristDisappears,
    ];
    const descriptions = [
        'Wrist Appears',
        'Starts handwashing',
        'Ends handwashing',
        'Wrist disappears',
    ];

    let cards = images.map((image, idx) => (
        <div className="column is-3">
            <HandwashingCard
                key={idx}
                imagePath={image}
                description={descriptions[idx]}
            />
        </div>
    ));
    return <div className="columns">{cards}</div>;
};
const HomeContent: React.FC = () => {
    return (
        <div className="container">
            <div className="hero">
                <div className="hero-body">
                    <p className="title">Cleanhands</p>
                    <p className="subtitle">
                        Improving hand hygiene one video a time.
                    </p>
                    <HandwashingCards />
                </div>
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
