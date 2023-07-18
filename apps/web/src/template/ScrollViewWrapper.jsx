import React from 'react';
import { ScrollView } from 'react-native';
import { withTheme } from 'react-native-paper';
import { isMobile } from '../utils/checkPlatform';

const ScrollViewWrapper = ({ isForceScroll = false, children, theme }) =>
  isMobile() && !isForceScroll ? (
    <>{children}</>
  ) : (
    <ScrollView
      style={{
        scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
      }}
      theme={theme}
    >
      {children}
    </ScrollView>
  );

export default withTheme(ScrollViewWrapper);
