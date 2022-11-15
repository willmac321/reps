import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { IconButton, withTheme, TouchableRipple, Text, Card } from 'react-native-paper';
import { useIsMounted } from '../utils/useIsMounted';
import { useIsSmallScreen } from '../utils/checkPlatform';

const ExerciseItem = ({
  theme,
  isSelected,
  text,
  onPress,
  handleTrash,
  showTrash = false,
  handleProgress,
  style = {},
  OnPressComponent = null,
  showAnimation = true,
  onLongPress = () => {},
  disabled = true,
}) => {
  const styles = StyleSheet.create({
    item: isSelected
      ? {
          marginHorizontal: 10,
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
          borderWidth: 1,
          borderRightWidth: 6,
        }
      : {
          marginHorizontal: 10,
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.primary,
          borderWidth: 1,
          borderRightWidth: 6,
        },
    icon: isSelected
      ? {
          color: theme.buttonText.color,
          margin: 'auto',
          ...theme.title,
        }
      : {
          color: theme.colors.primary,
          margin: 'auto',
          ...theme.title,
        },
    text: isSelected
      ? {
          color: theme.buttonText.color,
        }
      : {
          color: theme.colors.primary,
        },
    rowInput: {
      flex: 0,
      flexGrow: 3,
      minWidth: 50,
    },
    rowTextTitle: {
      alignSelf: 'flex-start',
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: 18,
      marginHorizontal: 4,
    },
    rowTextHeader: {
      alignSelf: 'flex-start',
      textAlign: 'left',
    },
    rowTextContainer: {
      flexGrow: 1,
      flex: 0,
      marginHorizontal: 4,
      paddingVertical: 4,
      paddingHorizontal: 4,
      borderRadius: 8,
      backgroundColor: `${theme.colors.backgroundShadow}`,
    },
    rowText: {
      fontWeight: 'bold',
      flexGrow: 1,
      flex: 0,
      paddingHorizontal: 4,
      textAlign: 'right',
      fontSize: 16,
    },
    rowSubText: {
      fontWeight: 'bold',
      flexGrow: 1,
      flex: 0,
      alignSelf: 'flex-end',
      textAlign: 'right',
      paddingHorizontal: 2,
      fontSize: 16,
    },
    rowContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexGrow: 1,
    },
    rowButtonContainer: {
      flex: 1,
      flexGrow: 1,
      alignItems: 'flex-end',
      padding: 0,
      flexDirection: 'row',
      margin: 'auto',
    },
    rowItemContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexGrow: 10,
      marginTop: 10,
      justifyContent: 'space-around',
    },
    rowSubContainer: {
      flex: 1,
      alignSelf: 'flex-end',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  });

  const isMounted = useIsMounted();
  const springAnim = React.useRef(new Animated.Value(0)).current;

  const isScreenSmall = useIsSmallScreen();

  React.useEffect(() => {
    if (isMounted.current && !isSelected) {
      Animated.spring(springAnim, {
        toValue: 100,
        useNativeDriver: true,
        duration: 300,
      }).start();
    }
  }, [isSelected, OnPressComponent]);

  const onLocalPress = () => {
    if (isMounted.current) {
      Animated.timing(springAnim, {
        toValue: 0,
        useNativeDriver: true,
        duration: 100,
        easing: Easing.in(),
      }).start(onPress);
    }
  };

  return (
    <View>
      {isSelected && OnPressComponent ? (
        <OnPressComponent
          theme={theme}
          content={text}
          onProgress={handleProgress}
          onPress={onLocalPress}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPress}
          onLongPress={onLongPress}
          disabled={disabled}
        >
          <Animated.View
            style={
              showAnimation
                ? {
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
                    ...style,
                  }
                : style
            }
          >
            <Card theme={theme} style={styles.item}>
              <TouchableRipple
                style={{
                  padding: 10,
                  borderRadius: theme.item.borderRadius,
                  borderWidth: 0,
                }}
                theme={theme}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'column', flexGrow: 10 }}>
                    <View theme={theme} style={[styles.rowTextContainer, { minHeight: 26 }]}>
                      <Text theme={theme} style={[styles.rowTextTitle, styles.text]}>
                        {text.title}
                      </Text>
                    </View>
                    <View theme={theme} style={styles.rowContainer}>
                      <View
                        theme={theme}
                        style={[
                          styles.rowItemContainer,
                          { flexDirection: isScreenSmall ? 'column' : 'row' },
                        ]}
                      >
                        <View
                          style={[
                            styles.rowTextContainer,
                            isScreenSmall ? { marginVertical: 4 } : {},
                          ]}
                        >
                          <Text theme={theme} style={[styles.rowTextHeader, styles.text]}>
                            Sets
                          </Text>
                          <Text theme={theme} style={[styles.rowText, styles.text]}>
                            {text.sets}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.rowTextContainer,
                            isScreenSmall ? { marginVertical: 4 } : {},
                          ]}
                        >
                          <Text theme={theme} style={[styles.rowTextHeader, styles.text]}>
                            Rep Range
                          </Text>
                          <View theme={theme} style={styles.rowSubContainer}>
                            <Text theme={theme} style={[styles.rowSubText, styles.text]}>
                              {text.repRange[0]}
                            </Text>
                            <Text theme={theme} style={[styles.rowSubText, styles.text]}>
                              to
                            </Text>
                            <Text theme={theme} style={[styles.rowSubText, styles.text]}>
                              {text.repRange[1]}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[
                            styles.rowTextContainer,
                            isScreenSmall ? { marginVertical: 4 } : {},
                          ]}
                        >
                          <Text theme={theme} style={[styles.rowTextHeader, styles.text]}>
                            Rest (mm:ss)
                          </Text>
                          <Text theme={theme} style={[styles.rowText, styles.text]}>
                            {new Date(text.rest * 1000).toISOString().substr(14, 5)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {showTrash && (
                    <TouchableOpacity
                      theme={theme}
                      style={[styles.rowButtonContainer, { flexGrow: 5 }]}
                      onPress={(e) => {
                        handleTrash(e, text.id);
                      }}
                    >
                      <IconButton
                        icon="trash-alt"
                        color={styles.icon.color}
                        onPress={(e) => {
                          handleTrash(e, text.id);
                        }}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableRipple>
            </Card>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default withTheme(ExerciseItem);
