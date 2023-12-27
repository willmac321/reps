import React from "react";
import { ScrollView } from "react-native";
import { withTheme, Portal, Dialog, Paragraph } from "react-native-paper";
import Button from "./ButtonTemplate";
import { isMobile } from "../utils/checkPlatform";

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
  style = {},
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
        style={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.secondary,
          borderWidth: 1,
          ...style,
        }}
      >
        <Dialog.Title
          theme={theme}
          style={{ ...(isMobile && { minHeight: 64 }), ...theme.title }}
        >
          {title}
        </Dialog.Title>
        <Dialog.Content>
          {content && (
            <Paragraph theme={theme} style={theme.paragraph}>
              {content}
            </Paragraph>
          )}
        </Dialog.Content>
        <Dialog.ScrollArea
          style={{
            maxHeight: 400,
            ...(!children && {
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }),
          }}
        >
          <ScrollView style={{}}>{children}</ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          {showButton && (
            <Button
              theme={{
                button: { ...theme.button },
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
