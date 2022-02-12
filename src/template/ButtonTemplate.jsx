import React from 'react';
import { withTheme, Button } from 'react-native-paper';

const ButtonTemplate = ({
  children,
  onPress,
  theme,
  isLoading = false,
  disabled = false,
  variant = 'primary',
}) => {
  const backgroundColor = () => {
    if (theme.button.backgroundColor === theme.colors.alert) {
      return theme.colors.alert;
    }
    if (variant === 'secondary') {
      return !disabled ? theme.colors.accent : theme.colors.primary;
    }
    return !disabled ? theme.colors.primary : theme.colors.accent;
  };
  return (
    <Button
      mode="contained"
      labelStyle={variant === 'secondary' ? theme.buttonTextSecondary : theme.buttonText}
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
