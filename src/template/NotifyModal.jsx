import React from 'react';
import { withTheme, Portal, Dialog, Paragraph } from 'react-native-paper';
import Button from './ButtonTemplate';

const NotifyModal = ({
  title,
  buttonText,
  theme,
  content,
  onPress,
  isVisible = false,
  setIsVisible,
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
          <Paragraph theme={theme} style={theme.paragraph}>
            {content || 'Prop is called content'}
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            theme={{
              button: { ...theme.button, marginRight: 10 },
            }}
            onPress={hideDialog}
          >
            {buttonText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default withTheme(NotifyModal);
