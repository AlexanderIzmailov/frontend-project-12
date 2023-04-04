import React, { useState, useContext } from 'react';

const AuthContext = React.createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    
    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}
