import React from 'react';
import { withTheme, Portal, Dialog, Paragraph } from 'react-native-paper';
import Button from './ButtonTemplate';

const NotifyModal = ({
  title,
  buttonText,
  theme,
  content,
  onPress,
  setIsVisible,
  children,
  isVisible = false,
  showButton = true,
}) => {
  const hideDialog = (e) => {
    setIsVisible(false);
    if (onPress) onPress(e);
  };

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={hideDialog}>
        <Dialog.Title theme={theme} style={theme.title}>
          {title}
        </Dialog.Title>
        <Dialog.Content>
          {content && (
            <Paragraph theme={theme} style={theme.paragraph}>
              {content}
            </Paragraph>
          )}
          {children}
        </Dialog.Content>
        <Dialog.Actions>
          {showButton && (
            <Button
              theme={{
                button: { ...theme.button, marginRight: 10 },
              }}
              onPress={hideDialog}
            >
              {buttonText}
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default withTheme(NotifyModal);
