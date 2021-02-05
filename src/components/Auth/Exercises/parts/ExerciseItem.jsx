import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, List, TouchableRipple, Text, Card } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

const ExerciseItem = ({ theme, isSelected, text, onPress, handleEdit, handleTrash }) => {
  const styles = StyleSheet.create({
    item: isSelected
      ? {
          backgroundColor: theme.colors.primary,
          ...theme.item,
        }
      : {
          ...theme.item,
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
          ...theme.buttonText,
        }
      : {
          ...theme.buttonText,
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
      marginLeft: 5,
    },
    rowText: {
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
      marginTop: 15,
    },
  });

  return (
    <Card
      theme={theme}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.primary,
          borderWidth: 1,
          borderRightWidth: 6,
        },
      ]}
    >
      <TouchableRipple
        style={{ borderRadius: theme.item.borderRadius, borderWidth: 0 }}
        theme={theme}
        onPress={() => ({
          // this ripple on works when a funciton is in onPress
        })}
      >
        <View>
          <View theme={theme}>
            <Text theme={theme} style={[styles.rowTextHeader]}>
              {text.title}
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
            <Text theme={theme} style={[styles.rowTextHeader]}>
              Sets
            </Text>
          </View>
        </View>
      </TouchableRipple>
    </Card>
  );
};

export default withTheme(ExerciseItem);
