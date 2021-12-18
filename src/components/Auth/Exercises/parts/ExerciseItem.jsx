import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, List, TouchableRipple, Text, Card } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

const ExerciseItem = ({
  theme,
  isSelected,
  text,
  onPress,
  handleEdit,
  handleTrash,
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

  return (
    <Card theme={theme} style={styles.item}>
      <TouchableRipple
        style={{
          padding: 10,
          borderRadius: theme.item.borderRadius,
          borderWidth: 0,
        }}
        theme={theme}
        onPress={() => onPress(text.id)}
      >
        {isSelected && OnPressComponent ? (
          <OnPressComponent theme={theme} content={text} onProgress={handleProgress} />
        ) : (
          <View>
            <View theme={theme}>
              <Text theme={theme} style={[styles.rowTextHeader, theme.buttonText, styles.text]}>
                {text.title}
              </Text>
            </View>
            <View theme={theme} style={styles.rowContainer}>
              <View
                style={[
                  {
                    flex: 0,
                    flexGrow: 4,
                  },
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
                  {
                    flex: 0,
                    flexGrow: 4,
                  },
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
                  {
                    flex: 0,
                    flexGrow: 4,
                  },
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
        )}
      </TouchableRipple>
    </Card>
  );
};

export default withTheme(ExerciseItem);
