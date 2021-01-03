import React from 'react';

export const StateContext = React.createContext();

export const StateContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <StateContext.Provider
      value={{
        isLoading,
        setIsLoading: () => setIsLoading(!isLoading),
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
