import React, { useCallback, useContext, useState } from 'react';
import { withTheme } from 'react-native-paper';
import { View, Animated, Easing, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StateContext } from '../../../../controllers/state';

const ExerciseOnPressLog = ({ theme, content, onProgress }) => {
  const styles = StyleSheet.create({
    item: {
      marginHorizontal: 10,
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRightWidth: 6,
    },
    icon: {
      color: theme.buttonText.color,
      marginVertical: 20,
      paddingRight: 20,
      ...theme.title,
    },
    text: {
      color: theme.buttonText.color,
    },
    rowTextHeader: {
      alignSelf: 'flex-start',
      textAlign: 'left',
      fontWeight: 'bold',
    },
  });
  const springAnim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.spring(springAnim, {
      toValue: 100,
      useNativeDriver: true,
      duration: 300,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        height: springAnim.interpolate({
          inputRange: [0, 100],
          outputRange: ['0em', `${2 + content.sets * 1}em`],
        }),
        opacity: springAnim.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1],
        }),
      }}
    >
      <View>
        <View theme={theme}>
          <Text theme={theme} style={[styles.rowTextHeader, theme.buttonText, styles.text]}>
            {content.title}
          </Text>
        </View>
        {[...Array(content.sets)].map((_, i) => (
          <View key={i}>
            <Text theme={theme} style={[styles.text]}>
              Set {i + 1}
            </Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

export default withTheme(ExerciseOnPressLog);
