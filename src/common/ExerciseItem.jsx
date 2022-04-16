import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { withTheme, TouchableRipple, Text, Card } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { useIsMounted } from '../utils/useIsMounted';

const ExerciseItem = ({
  theme,
  isSelected,
  text,
  onPress,
  handleEdit,
  handleTrash,
  showEditAndTrash = false,
  handleProgress,
  OnPressComponent = null,
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
          marginVertical: 20,
          paddingRight: 20,
          ...theme.title,
        }
      : {
          color: theme.colors.primary,
          paddingRight: 20,
          marginVertical: 20,
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
    rowTextHeader: {
      alignSelf: 'flex-start',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    rowText: {
      flexGrow: 1,
      flex: 0,
      marginTop: 5,
      paddingHorizontal: 2,
    },
    rowSubText: {
      flexGrow: 1,
      flex: 0,
      alignSelf: 'center',
      textAlign: 'center',
      marginTop: 5,
      paddingHorizontal: 2,
    },
    rowContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 10,
      justifyContent: 'space-around',
      marginTop: 10,
    },
    rowSubContainer: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  });

  const isMounted = useIsMounted();
  const springAnim = React.useRef(new Animated.Value(0)).current;

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
                    {text.title}
                  </Text>
                </View>
                <View theme={theme} style={styles.rowContainer}>
                  <View style={styles.rowText}>
                    <Text theme={theme} style={[styles.rowTextHeader, styles.text]}>
                      Sets
                    </Text>
                    <Text theme={theme} style={[styles.rowText, styles.text]}>
                      {text.sets}
                    </Text>
                  </View>
                  <View style={styles.rowText}>
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
                  <View style={styles.rowText}>
                    <Text theme={theme} style={[styles.rowTextHeader, styles.text]}>
                      Rest (mm:ss)
                    </Text>
                    <Text theme={theme} style={[styles.rowText, styles.text]}>
                      {new Date(text.rest * 1000).toISOString().substr(14, 5)}
                    </Text>
                  </View>
                </View>
                {showEditAndTrash && (
                  <>
                    <FontAwesome5
                      name="pen"
                      style={styles.icon}
                      onPress={(e) => handleEdit(e, text.id)}
                    />
                    <FontAwesome5
                      name="trash-alt"
                      style={styles.icon}
                      onPress={(e) => handleTrash(e, text.id)}
                    />
                  </>
                )}
              </View>
            </TouchableRipple>
          </Card>
        </Animated.View>
      )}
    </View>
  );
};

export default withTheme(ExerciseItem);
