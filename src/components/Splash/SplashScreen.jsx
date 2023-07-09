import React from 'react';
import { withTheme } from 'react-native-paper';
import { StatusBar, View } from 'react-native';
import SplashLight from './parts/SplashLight';
import SplashDark from './parts/SplashDark';
import { StateContext } from '../../controllers/state';
import { isMobile } from '../../utils/checkPlatform';

const SplashScreen = ({ theme }) => {
  const {
    userDetails: { theme: userTheme },
  } = React.useContext(StateContext);
  const mT = isMobile() ? StatusBar.height : 0;
  return (
    <View
      flex={1}
      style={{
        height: isMobile() ? '120%' : '100%',
        width: '100%',
        position: 'absolute',
        top: mT,
      }}
    >
      {userTheme === 'dark' ? <SplashDark theme={theme} /> : <SplashLight theme={theme} />}
    </View>
  );
};

export default withTheme(SplashScreen);
