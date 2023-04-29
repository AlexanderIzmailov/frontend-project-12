import React, { useState, useContext } from 'react';

const AuthContext = React.createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [authUser, setAuthUser] = useState(user && user.username);
  const [isLoggedIn, setIsLoggedIn] = useState(user === true);
  const [token, setToken] = useState(user && user.token);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
  };

  const { children } = props;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
