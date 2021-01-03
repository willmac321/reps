import React from 'react';
import { withTheme, Portal, Dialog, Paragraph } from 'react-native-paper';
import Button from './ButtonTemplate';

const NotifyModal = ({ title, buttonText, theme, content, onPress }) => {
  const [visible, setVisible] = React.useState(true);
  const hideDialog = () => {
    setVisible(false);
  };
  const continueForward = (e) => {
    setVisible(false);
    onPress(e);
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{ backgroundColor: theme.colors.background }}
      >
        <Dialog.Title theme={theme} style={theme.title}>
          {title || 'Bro, you sure?'}
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph theme={theme} style={theme.paragraph}>
            {content || 'About to cross the point of no return.'}
          </Paragraph>
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
          >
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default withTheme(NotifyModal);
