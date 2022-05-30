import React from 'react';
import { withTheme } from 'react-native-paper';
import SplashLight from './parts/SplashLight';
import SplashDark from './parts/SplashDark';
import { StateContext } from '../../controllers/state';

const SplashScreen = ({ theme }) => {
  const {
    userDetails: { theme: userTheme },
  } = React.useContext(StateContext);
  return userTheme === 'dark' ? <SplashDark theme={theme} /> : <SplashLight theme={theme} />;
};

export default withTheme(SplashScreen);
