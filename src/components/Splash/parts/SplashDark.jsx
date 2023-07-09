import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, ActivityIndicator, withTheme } from 'react-native-paper';
import { StateContext } from '../../../controllers/state';
import Adonis from './Adonis';
import Aphrodite from './Aphrodite';

const styles = StyleSheet.create({
  head: {
    fontWeight: 'bold',
    lineHeight: 75,
    fontSize: 64,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  img: {
    marginTop: 100,
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

const SplashScreen = ({ theme }) => {
  const {
    userDetails: { splashScreenIcon },
  } = React.useContext(StateContext);
  const isAdonis = () => splashScreenIcon === 'adonis';
  const mainColor = () => (isAdonis() ? theme.colors.background : theme.colors.primary);
  return (
    <View
      theme={theme}
      style={[
        styles.parentView,
        {
          backgroundColor: isAdonis() ? theme.colors.primary : theme.colors.background,
        },
      ]}
    >
      {isAdonis() ? (
        <Adonis style={StyleSheet.flatten([styles.img, { fill: theme.colors.background }])} />
      ) : (
        <Aphrodite style={StyleSheet.flatten([styles.img, { fill: theme.colors.primary }])} />
      )}
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          marginRight: 'auto',
          marginLeft: 'auto',
          borderColor: mainColor(),
          borderRadius: theme.roundness,
          borderWidth: 2,
          width: `24%`,
        }}
      />
      <Title theme={theme} style={[styles.head, { color: mainColor() }]}>
        REPS
      </Title>
      <StateContext.Consumer>
        {({ isLoading }) =>
          isLoading && <ActivityIndicator animating size="large" color={mainColor()} />
        }
      </StateContext.Consumer>
    </View>
  );
};

export default withTheme(SplashScreen);
