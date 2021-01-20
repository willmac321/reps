import React from 'react';
import { firebase } from '../firebase/config';
import API from './AuthApi';

export const StateContext = React.createContext();

export const StateContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [justRegistered, setJustRegistered] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [authRes, setAuthRes] = React.useState(null);

  // FIXME
  //  React.useEffect(() => {
  //    firebase.auth().onAuthStateChanged((res) => {
  //      setIsLoading(false);
  //      setAuthRes(res);
  //    });
  //  }, []);
  React.useEffect(() => {
    if (authRes && !authRes.emailVerified && !justRegistered) {
      API.logout(() => {});
      setUser(null);
      return;
    }
    if (authRes && !authRes.emailVerified && justRegistered) {
      authRes.sendEmailVerification();
      setJustRegistered(false);
    }
    setUser(authRes);
  }, [authRes]);

  return (
    <StateContext.Provider
      value={{
        isLoading,
        setIsLoading: () => setIsLoading(!isLoading),
        user,
        setJustRegistered,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
