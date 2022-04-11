import React, { useState } from 'react';
import { Platform, View, Animated, Easing, Text, StyleSheet } from 'react-native';
import { Card, withTheme, TouchableRipple } from 'react-native-paper';
import { useIsMounted } from '../../../../utils/useIsMounted';
import Button from '../../../../template/ButtonTemplate';

const ExerciseOnPressLog = ({ theme, content, onProgress }) => {
  const springAnim = React.useRef(new Animated.Value(0)).current;
  const isMounted = useIsMounted();
  const animColor = React.useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = useState(0);

  const styles = StyleSheet.create({
    item: {
      marginHorizontal: 10,
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRightWidth: 6,
    },
    selectedText: {
      ...theme.buttonTextSecondary,
      color: theme.buttonTextSecondary.color,
    },
    subItemView: {
      flex: 0,
      flexGrow: 1,
      textAlignVertical: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    subItemText: {
      marginVertical: 'auto',
      flex: 0,
      flexGrow: 1,
    },
    subItem: {
      ...theme.item,
      flexDirection: 'row',
      flex: 0,
      flexGrow: 1,
      borderWidth: 1,
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.secondarySelected,
      padding: '.5em',
      margin: '.1em',
      minHeight: '4em',
    },
    selectedSubItem: {
      ...theme.item,
      borderWidth: 1,
      borderColor: theme.colors.secondarySelected,
      padding: '.5em',
      margin: '.1em',
      minHeight: '4em',
      backgroundColor: theme.colors.secondarySelected,
    },
    icon: {
      color: theme.buttonText.color,
      marginVertical: 20,
      paddingRight: 20,
      ...theme.title,
    },
    text: {
      marginVertical: 'auto',
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

  const onLocalPress = (index) => {
    if (isMounted.current) {
      setSelected(index);
      Animated.timing(animColor, {
        toValue: 1,
        useNativeDriver: true,
        duration: 400,
        easing: Easing.in(Easing.exp),
      }).start(() => {});
    }
  };

  const goNext = React.useCallback(() => {
    if (isMounted.current) {
      if (parseInt(content.sets, 10) - 1 > selected) {
        onLocalPress(selected + 1);
      } else {
        onProgress();
        setSelected(null);
      }
    }
  }, [isMounted, selected, onProgress, onLocalPress, setSelected, content.sets]);

  React.useEffect(() => {
    const listener = (event) => {
      if (isMounted.current && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
        goNext();
      }
    };
    if (isMounted.current === true && Platform.OS === 'web') {
      document.addEventListener('keydown', listener);
    }
    return () => {
      if (Platform.OS === 'web') {
        document.removeEventListener('keydown', listener);
      }
    };
  }, [goNext, isMounted]);

  return (
    <>
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
          >
            <View>
              <View theme={theme}>
                <Text theme={theme} style={[styles.rowTextHeader, theme.buttonText, styles.text]}>
                  {content.title}
                </Text>
              </View>
              {[...Array(content.sets)].map((_, i) => (
                <TouchableRipple
                  key={`selected_${Date.now()}_${i}`}
                  rippleColor={theme.colors.secondarySelected}
                  underlayColor={theme.colors.secondarySelected}
                  theme={theme}
                  style={selected === i ? styles.selectedSubItem : styles.subItem}
                  onPress={(e) => onLocalPress(i, e)}
                >
                  <View theme={theme} style={styles.subItemView}>
                    <View style={styles.subItemText}>
                      <Text
                        theme={theme}
                        style={selected === i ? styles.selectedText : styles.text}
                      >
                        Set {i + 1}
                      </Text>
                    </View>
                    <View style={styles.subItemText}>
                      <Text
                        theme={theme}
                        style={selected === i ? styles.selectedText : styles.text}
                      >
                        Rep Range: {content.repRange[0]} to {content.repRange[1]}
                      </Text>
                    </View>
                    <View theme={theme} style={[styles.subItemText, { alignItems: 'end' }]}>
                      {selected === i ? (
                        <View theme={theme} style={[styles.subItemText, { alignItems: 'end' }]}>
                          <Button
                            theme={{
                              button: {
                                ...theme.button,
                                width: 100,
                                marginLeft: 10,
                                marginRight: 10,
                              },
                            }}
                            variant="secondary"
                            onPress={goNext}
                            // isLoading={isLoading}
                          >
                            Next
                          </Button>
                          <Text
                            theme={theme}
                            style={[styles.selectedText, theme.paragraph, { margin: 'auto' }]}
                          >
                            Rest Target: {new Date(content.rest * 1000).toISOString().substr(14, 5)}
                          </Text>
                        </View>
                      ) : (
                        <Text theme={theme} style={[styles.text]}>
                          Rest Target: {new Date(content.rest * 1000).toISOString().substr(14, 5)}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableRipple>
              ))}
            </View>
          </TouchableRipple>
        </Card>
      </Animated.View>
    </>
  );
};

export default withTheme(ExerciseOnPressLog);
