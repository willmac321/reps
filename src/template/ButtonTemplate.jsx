import React from 'react';
import { withTheme, Button } from 'react-native-paper';

const ButtonTemplate = ({ children, onPress, theme, isLoading = false, disabled = false }) => (
  <Button
    mode="contained"
    labelStyle={theme.buttonText}
    style={theme.button}
    dark
    uppercase={false}
    theme={theme}
    onPress={onPress}
    loading={isLoading}
    disabled={disabled}
  >
    {children || 'Ok'}
  </Button>
);

export default withTheme(ButtonTemplate);
