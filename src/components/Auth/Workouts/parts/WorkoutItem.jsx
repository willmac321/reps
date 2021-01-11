import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, List } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

const WorkoutItem = ({ theme, isSelected, text, onPress }) => {
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
          color: theme.colors.primary,
          ...theme.title,
        }
      : {
          color: theme.colors.primary,
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
  });

  console.log(isSelected);

  return (
    <List.Item
      title={text.title}
      description={text.date}
      theme={theme}
      style={styles.item}
      onPress={onPress}
      titleStyle={styles.text}
      descriptionStyle={[styles.text, { fontSize: 'auto', fontWeight: 'normal' }]}
      right={() => (
        <>
          <FontAwesome5 name="pen" style={styles.icon} />
          <FontAwesome5 name="trash-alt" style={styles.icon} />
        </>
      )}
    />
  );
};

export default withTheme(WorkoutItem);
