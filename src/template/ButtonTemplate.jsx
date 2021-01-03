import React from 'react';
import { withTheme, Button } from 'react-native-paper';

const ButtonTemplate = ({ children, onPress, theme, isLoading = false, disabled = false }) => {
  const backgroundColor = () => {
    if (theme.button.backgroundColor === theme.colors.alert) {
      return theme.colors.alert;
    }
    return !disabled ? theme.colors.primary : theme.colors.accent;
  };
  return (
    <Button
      mode="contained"
      labelStyle={theme.buttonText}
      uppercase={false}
      theme={theme}
      onPress={onPress}
      loading={isLoading}
      style={[
        theme.button,
        {
          backgroundColor: backgroundColor(),
        },
      ]}
      disabled={disabled}
    >
      {children || 'Ok'}
    </Button>
  );
};

export default withTheme(ButtonTemplate);
