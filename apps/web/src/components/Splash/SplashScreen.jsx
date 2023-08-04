import React from 'react';
import { withTheme } from 'react-native-paper';
import { View } from 'react-native';
import SplashLight from './parts/SplashLight';
import SplashDark from './parts/SplashDark';
import { StateContext } from '../../controllers/state';

const SplashScreen = ({ theme }) => {
  const {
    userDetails: { theme: userTheme },
  } = React.useContext(StateContext);
  return (
    <View
      style={{
        height: '100%',
        flex: 1,
        flexGrow: 1,
      }}
    >
      {userTheme === 'dark' ? <SplashDark theme={theme} /> : <SplashLight theme={theme} />}
    </View>
  );
};

export default withTheme(SplashScreen);
