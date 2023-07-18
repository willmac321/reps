import React from 'react';
import { withTheme, Portal, Modal } from 'react-native-paper';
import SplashScreen from '../components/Splash/SplashScreen';

const LoadingOverlay = ({ isVisible, theme }) => (
  <Portal>
    <Modal
      visible={isVisible}
      dismissable={false}
      contentContainerStyle={{ elevation: 0, height: '100%' }}
      theme={theme}
    >
      <SplashScreen />
    </Modal>
  </Portal>
);

export default withTheme(LoadingOverlay);
