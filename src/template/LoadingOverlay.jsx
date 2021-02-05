import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme, Portal, ActivityIndicator, Modal } from 'react-native-paper';

const LoadingOverlay = ({ isVisible, theme }) => {
  const styles = StyleSheet.create({
    card: theme.card,
  });
  return (
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
};

export default withTheme(LoadingOverlay);
