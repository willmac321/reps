import React from 'react';
import { withTheme } from 'react-native-paper';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SplashLight from './parts/SplashLight';
import SplashDark from './parts/SplashDark';
import { StateContext } from '../../controllers/state';
import { isMobile } from '../../utils/checkPlatform';

const SplashScreen = ({ theme }) => {
  const {
    userDetails: { theme: userTheme },
  } = React.useContext(StateContext);
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        height: isMobile() ? '130%' : '100%',
        width: '100%',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {userTheme === 'dark' ? <SplashDark theme={theme} /> : <SplashLight theme={theme} />}
    </View>
  );
};

export default withTheme(SplashScreen);
