import React from 'react';
import { withTheme, Portal, ActivityIndicator, Modal } from 'react-native-paper';

const LoadingOverlay = ({ isVisible, theme }) => (
  <Portal>
    <Modal
      visible={isVisible}
      dismissable={false}
      contentContainerStyle={{ elevation: 0 }}
      theme={theme}
    >
      <ActivityIndicator animating size="large" color={theme.colors.primary} />
    </Modal>
  </Portal>
);

export default withTheme(LoadingOverlay);
