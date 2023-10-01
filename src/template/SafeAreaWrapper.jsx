import React from 'react';
import { withTheme } from 'react-native-paper';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeArea = ({ children, theme }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      theme={theme}
      style={{
        flex: 1,
        flexGrow: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
        backgroundColor: theme.colors.background,
      }}
    >
      {children}
    </View>
  );
};

export default withTheme(SafeArea);
