import React from 'react';
import { Keyboard, Platform, LayoutAnimation, UIManager } from 'react-native';
import { withTheme } from 'react-native-paper';
import Forgot from './parts/Forgot';
import SafeArea from '../../../template/SafeAreaWrapper';
import { useIsMounted } from '../../../utils/useIsMounted';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ForgotScreen = ({ theme, navigation }) => {
  const isMounted = useIsMounted();
  const [customTopMargin, setCustomTopMargin] = React.useState(theme.card.marginTop);

  const keyboardEventShow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setCustomTopMargin(50);
  };

  const keyboardEventHide = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setCustomTopMargin(theme.card.marginTop);
  };

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardEventShow);
    Keyboard.addListener('keyboardDidHide', keyboardEventHide);

    // cleanup function
    return () => {
      if (isMounted.current) {
        Keyboard.removeListener('keyboardDidShow', keyboardEventShow);
        Keyboard.removeListener('keyboardDidHide', keyboardEventHide);
      }
    };
  }, []);

  return (
    <SafeArea theme={theme}>
      <Forgot style={{ marginTop: customTopMargin }} theme={theme} />
    </SafeArea>
  );
};

export default withTheme(ForgotScreen);
