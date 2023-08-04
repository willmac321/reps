import debounce from 'lodash/debounce';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { withTheme, Portal } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SplashScreen from '../components/Splash/SplashScreen';

const LoadingOverlay = ({ isVisible, theme }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(
    debounce(() => setIsLoading(isVisible), 100),
    [isVisible]
  );

  const insets = useSafeAreaInsets();

  return (
    <Portal theme={theme}>
      <View
        style={{
          height: '100%',
          width: '100%',
          visibility: isLoading ? 'visible' : 'hidden',
          flexGrow: 1,
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        theme={theme}
      >
        <SplashScreen />
      </View>
    </Portal>
  );
};

export default withTheme(LoadingOverlay);
