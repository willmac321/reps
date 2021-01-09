import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, LayoutAnimation, UIManager } from 'react-native';
import { withTheme } from 'react-native-paper';
import NotifyModal from '../../../template/NotifyModal';
import Register from './parts/Register';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const RegisterScreen = ({ theme, navigation }) => {
  const [customTopMargin, setCustomTopMargin] = React.useState(theme.card.marginTop);
  const [showNotify, setShowNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');

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
      Keyboard.removeListener('keyboardDidShow', keyboardEventShow);
      Keyboard.removeListener('keyboardDidHide', keyboardEventHide);
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Register
        setShowNotify={setShowNotify}
        setNotifyMessage={setNotifyMessage}
        setNotifyTitle={setNotifyTitle}
        style={{ marginTop: customTopMargin }}
        theme={theme}
        navigation={navigation}
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

export default withTheme(RegisterScreen);
