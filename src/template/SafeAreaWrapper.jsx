import React from 'react';
import { withTheme } from 'react-native-paper';
import { View } from 'react-native';

const SafeArea = ({ children, theme }) => (
  <View
    theme={theme}
    style={{
      flex: 1,
      flexGrow: 1,
      scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
      backgroundColor: theme.colors.background,
    }}
  >
    {children}
  </View>
);

export default withTheme(SafeArea);
