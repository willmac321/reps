import React from 'react';
import { withTheme, Portal, Dialog, Paragraph } from 'react-native-paper';
import Button from './ButtonTemplate';

const NotifyModal = ({ title, buttonText, theme, content, onPress }) => {
  const [visible, setVisible] = React.useState(true);

  const hideDialog = (e) => {
    setVisible(false);
    onPress(e);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
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
