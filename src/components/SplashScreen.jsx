import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, withTheme } from 'react-native-paper';
import Adonis from './Adonis';

const styles = StyleSheet.create({
  head: {
    fontWeight: 'bold',
    lineHeight: 75,
    fontSize: 64,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  img: {
    marginTop: '25%',
    marginRight: 'auto',
    marginLeft: 'auto',
    height: 300,
    width: 300,
  },
  parentView: {
    height: '100%',
    width: '100%',
  },
});

const SplashScreen = ({ theme }) => (
  <View
    theme={theme}
    style={[styles.parentView, styles.container, { backgroundColor: theme.colors.background }]}
  >
    <Adonis style={StyleSheet.flatten([styles.img, { fill: theme.colors.primary }])} />
    <View
      style={{
        marginTop: 10,
        marginBottom: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderColor: theme.colors.primary,
        borderRadius: theme.roundness,
        borderWidth: 2,
        width: `24%`,
      }}
    />
    <Title theme={theme} style={styles.head}>
      REPS
    </Title>
  </View>
);

export default withTheme(SplashScreen);
