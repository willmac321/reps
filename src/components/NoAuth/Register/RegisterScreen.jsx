import React from 'react';
import { ScrollView, Keyboard, LayoutAnimation } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { withTheme } from 'react-native-paper';
import NotifyModal from '../../../template/NotifyModal';
import Register from './parts/Register';
import SafeArea from '../../../template/SafeAreaWrapper';
import { useIsMounted } from '../../../utils/useIsMounted';

const RegisterScreen = ({ theme, navigation }) => {
  const isMounted = useIsMounted();
  const isFocused = useIsFocused();
  const [showNotify, setShowNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');

  const keyboardEventShow = () => {
    if (isFocused) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
  };

  const keyboardEventHide = () => {
    if (isFocused) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
  };

  React.useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', keyboardEventShow);
    const didHide = Keyboard.addListener('keyboardDidHide', keyboardEventHide);

    // cleanup function
    return () => {
      if (isMounted.current) {
        didShow.remove();
        didHide.remove();
      }
    };
  }, []);
  return (
    <SafeArea theme={theme}>
      <ScrollView
        style={{
          scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
        }}
        theme={theme}
      >
        <Register
          setShowNotify={setShowNotify}
          setNotifyMessage={setNotifyMessage}
          setNotifyTitle={setNotifyTitle}
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
      </ScrollView>
    </SafeArea>
  );
};

export default withTheme(RegisterScreen);
