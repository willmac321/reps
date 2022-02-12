import React, { useCallback, useContext, useState } from 'react';
import { Card, withTheme, TouchableRipple } from 'react-native-paper';
import { View, Animated, Easing, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StateContext } from '../../../../controllers/state';

const ExerciseOnPressLog = ({ theme, content, onProgress, onPress }) => {
  const springAnim = React.useRef(new Animated.Value(0)).current;
  const animColor = React.useRef(new Animated.Value(0)).current;
  const styles = StyleSheet.create({
    item: {
      marginHorizontal: 10,
      backgroundColor: animColor.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.colors.primary, theme.colors.background],
      }),
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
  React.useEffect(() => {
    Animated.spring(springAnim, {
      toValue: 100,
      useNativeDriver: true,
      duration: 300,
    }).start();
  }, []);

  const onLocalPress = () => {
    Animated.timing(animColor, {
      toValue: 0,
      useNativeDriver: true,
      duration: 400,
      easing: Easing.in(),
    }).start();

    Animated.timing(springAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 100,
      easing: Easing.in(),
    }).start(onPress);
  };

  return (
    <Animated.View
      style={{
        transform: [
          {
            scale: springAnim.interpolate({
              inputRange: [1, 100],
              outputRange: [0.8, 1],
            }),
          },
        ],
        opacity: springAnim.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1],
        }),
      }}
    >
      <Card theme={theme} style={styles.item}>
        <TouchableRipple
          style={{
            padding: 10,
            borderRadius: theme.item.borderRadius,
            borderWidth: 0,
          }}
          theme={theme}
          onPress={onPress}
        >
          <View>
            <View theme={theme}>
              <Text theme={theme} style={[styles.rowTextHeader, theme.buttonText, styles.text]}>
                {content.title}
              </Text>
            </View>
            {[...Array(content.sets)].map((_, i) => (
              <TouchableRipple
                key={`${Date.now()}_${i}`}
                style={{
                  padding: '.5em',
                  borderRadius: theme.item.borderRadius,
                  borderWidth: 0,
                }}
                theme={theme}
                onPress={onLocalPress}
              >
                <View>
                  <Text theme={theme} style={[styles.text]}>
                    Set {i + 1}
                  </Text>
                </View>
              </TouchableRipple>
            ))}
          </View>
        </TouchableRipple>
      </Card>
    </Animated.View>
  );
};

export default withTheme(ExerciseOnPressLog);
