import React from 'react';
import { withTheme, Portal, Dialog, Paragraph } from 'react-native-paper';
import Button from './ButtonTemplate';

const NotifyModal = ({
  title,
  buttonText,
  theme,
  content,
  onPress,
  visible,
  setVisible,
  isLoading,
  setIsCancel = () => {},
  children,
}) => {
  const hideDialog = () => {
    setIsCancel(true);
    setVisible(false);
  };
  const continueForward = (e) => {
    onPress(e);
    setVisible(false);
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.secondary,
          borderWidth: 1,
        }}
      >
        <Dialog.Title theme={theme} style={theme.title}>
          {title || 'Friend, you sure?'}
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph theme={theme} style={theme.paragraph}>
            {content || 'About to cross the point of no return.'}
          </Paragraph>
          {children}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            theme={{
              button: {
                ...theme.button,
                marginRight: 10,
                width: 100,
                backgroundColor: theme.colors.alert,
              },
            }}
            onPress={continueForward}
            isLoading={isLoading}
          >
            {buttonText}
          </Button>
          <Button
            theme={{
              button: {
                ...theme.button,
                width: 100,
                marginLeft: 10,
                marginRight: 10,
              },
            }}
            onPress={hideDialog}
            isLoading={isLoading}
          >
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default withTheme(NotifyModal);
