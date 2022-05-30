import React from 'react';
import { Keyboard, ScrollView, LayoutAnimation } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { withTheme } from 'react-native-paper';
import NotifyModal from '../../../template/NotifyModal';
import Login from './parts/Login';
import Register from './parts/Register';
import SafeArea from '../../../template/SafeAreaWrapper';

const LoginScreen = ({ theme, navigation }) => {
  const [showNotify, setShowNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');

  return (
    <SafeArea theme={theme}>
      <ScrollView
        style={{
          scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
        }}
        theme={theme}
      >
        <Register theme={theme} navigation={navigation} />
        <Login
          setShowNotify={setShowNotify}
          setNotifyMessage={setNotifyMessage}
          setNotifyTitle={setNotifyTitle}
          theme={theme}
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

export default withTheme(LoginScreen);
