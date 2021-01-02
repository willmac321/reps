import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, LayoutAnimation, UIManager } from 'react-native';
import { withTheme } from 'react-native-paper';
import Login from './parts/Login';
import Register from './parts/Register';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LoginScreen = ({ theme, navigation }) => {
  const [showRegister, setShowRegister] = React.useState(true);
  const [customTopMargin, setCustomTopMargin] = React.useState(theme.card.marginTop);

  const keyboardEventShow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShowRegister(false);
    setCustomTopMargin(50);
  };

  const keyboardEventHide = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShowRegister(true);
    setCustomTopMargin(theme.card.marginTop);
  };

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardEventShow);
    Keyboard.addListener('keyboardDidHide', keyboardEventHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardEventShow);
      Keyboard.removeListener('keyboardDidHide', keyboardEventHide);
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {showRegister && <Register theme={theme} navigation={navigation} />}
      <Login style={{ marginTop: customTopMargin }} theme={theme} />
    </KeyboardAvoidingView>
  );
};

export default withTheme(LoginScreen);
