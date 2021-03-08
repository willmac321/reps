import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, List } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

const WorkoutItem = ({
  theme,
  isSelected,
  text,
  onPress,
  handleEdit,
  handleTrash,
  showEditAndTrash = true,
}) => {
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
  });

  return (
    <List.Item
      title={text.title}
      titleNumberOfLines={1}
      titleEllipsizeMode="tail"
      descriptionEllipsizeMode="tail"
      descriptionNumberOfLines={1}
      description={text.date}
      theme={theme}
      style={styles.item}
      onPress={onPress}
      titleStyle={styles.text}
      descriptionStyle={[styles.text, { fontWeight: 'normal' }]}
      right={() => (
        <>
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
        </>
      )}
    />
  );
};

export default withTheme(WorkoutItem);
