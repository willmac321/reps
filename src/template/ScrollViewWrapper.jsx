import React from 'react';
import { ScrollView } from 'react-native';
import { withTheme } from 'react-native-paper';
import {isMobile} from '../utils/checkPlatform';

const ScrollViewWrapper = ({ children, theme, style }) =>
  isMobile() ? (
    <>{children}</>
  ) : (
    <ScrollView
      style={{
        height: '100%',
        flex: '1 1 0',
        scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
        ...style
      }}
      theme={theme}
    >
      {children}
    </ScrollView>
  );

export default withTheme(ScrollViewWrapper);
