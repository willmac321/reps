import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, LayoutAnimation, UIManager } from 'react-native';
import { withTheme } from 'react-native-paper';
import NotifyModal from '../../../template/NotifyModal';
import Login from './parts/Login';
import Register from './parts/Register';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LoginScreen = ({ theme, navigation }) => {
  const [showRegister, setShowRegister] = React.useState(true);
  const [customTopMargin, setCustomTopMargin] = React.useState(theme.card.marginTop);
  const [showNotify, setShowNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');

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
      <Login
        setShowNotify={setShowNotify}
        setNotifyMessage={setNotifyMessage}
        setNotifyTitle={setNotifyTitle}
        style={{ marginTop: customTopMargin }}
        theme={theme}
      />
      <NotifyModal
        title={notifyTitle}
        theme={theme}
        content={notifyMessage}
        isVisible={showNotify}
        setIsVisible={setShowNotify}
      />
    </KeyboardAvoidingView>
  );
};

export default withTheme(LoginScreen);
