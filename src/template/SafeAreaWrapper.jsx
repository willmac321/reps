import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme } from 'react-native-paper';
import { isMobile } from '../utils/checkPlatform';

const SafeArea = ({ children, theme }) =>
  isMobile() ? (
    <SafeAreaView
      theme={theme}
      style={{ flexGrow: 1, scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}` }}
    >
      {children}
    </SafeAreaView>
  ) : (
    <>{children}</>
  );

export default withTheme(SafeArea);
