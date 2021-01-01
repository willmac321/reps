import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';
import Adonis from '~/src/components/Adonis.jsx';

const styles = StyleSheet.create({
  img: {
    marginTop: '10%',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '30%',
    height: '30%',
    display: 'block',
  },
  parentView: {
    height: '100%',
    width: '100%',
  },
});

const SplashScreen = ({ theme }) => (
  <View style={[styles.parentView, styles.container]}>
    <Adonis style={StyleSheet.flatten([styles.img, { fill: theme.colors.primary }])} />
  </View>
);

export default withTheme(SplashScreen);
