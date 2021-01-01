import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, withTheme } from 'react-native-paper';
import Adonis from '~/src/components/Adonis.jsx';

const styles = StyleSheet.create({
  head: {
    fontWeight: 700,
    lineHeight: 75,
    fontSize: 64,
    marginHorizontal: 'auto',
  },
  img: {
    marginTop: '25%',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '55%',
    display: 'block',
  },
  parentView: {
    height: '100%',
    width: '100%',
  },
});

const SplashScreen = ({ theme }) => {
  console.log(theme);
  return (
    <View
      theme={theme}
      style={[styles.parentView, styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Adonis style={StyleSheet.flatten([styles.img, { fill: theme.colors.primary }])} />
      <hr
        style={{
          marginTop: '1.5vh',
          marginBottom: '1.5vh',
          color: theme.colors.primary,
          backgroundColor: theme.colors.primary,
          borderRadius: theme.roundness,
          height: '2px',
          width: `24%`,
        }}
      />
      <Title theme={theme} style={styles.head}>
        REPS
      </Title>
    </View>
  );
};

export default withTheme(SplashScreen);
