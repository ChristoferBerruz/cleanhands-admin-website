import React, { useState } from 'react';

// set the defaults
export const IsLoggedInContext = React.createContext({
    isLoggedIn: false,
    setLoginStatus: new Function(),
});

const LoggedInProvider: React.FC = ({ children }) => {
    const [isLoggedIn, setLoginStatus] = useState(false);
    const initial = { isLoggedIn, setLoginStatus };

    return (
        <IsLoggedInContext.Provider value={initial}>
            {children}
        </IsLoggedInContext.Provider>
    );
};
export default LoggedInProvider;
