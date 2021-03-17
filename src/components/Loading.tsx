import React from 'react';
import loadingSpinner from 'assets/loading-spinner.svg';

const Loading: React.FC = () => {
    return (
        <div>
            <img src={loadingSpinner} />
        </div>
    );
};

export default Loading;
