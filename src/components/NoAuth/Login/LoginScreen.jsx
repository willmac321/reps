import React from 'react';
import { ScrollView } from 'react-native';
import { withTheme } from 'react-native-paper';
import NotifyModal from '../../../template/NotifyModal';
import Login from './parts/Login';
import Register from './parts/Register';
import SafeArea from '../../../template/SafeAreaWrapper';
import { StateContext } from '../../../controllers/state';
import LoadingScreenOverlay from '../../../template/LoadingScreenOverlay';

const LoginScreen = ({ theme, navigation }) => {
  const [showNotify, setShowNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');

  const { isLoading } = React.useContext(StateContext);

  if (isLoading) return <LoadingScreenOverlay isVisible={isLoading} theme={theme} />;

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
