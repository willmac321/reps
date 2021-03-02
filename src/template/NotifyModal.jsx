import React from 'react';
import { View, ScrollView } from 'react-native';
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
      <Dialog
        visible={isVisible}
        onDismiss={hideDialog}
        style={{ backgroundColor: theme.colors.background }}
      >
        <Dialog.Title theme={theme} style={theme.title}>
          {title}
        </Dialog.Title>
        <Dialog.Content>
          {content && (
            <Paragraph theme={theme} style={theme.paragraph}>
              {content}
            </Paragraph>
          )}
        </Dialog.Content>
        <Dialog.ScrollArea>
          <ScrollView>{children}</ScrollView>
        </Dialog.ScrollArea>
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
