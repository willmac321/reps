import React from 'react';
import { StyleSheet } from 'react-native';
import { withTheme, List, IconButton } from 'react-native-paper';

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
          ...theme.title,
          marginVertical: 20,
          fontSize: 16,
        }
      : {
          ...theme.title,
          marginVertical: 20,
          fontSize: 16,
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
              <IconButton
                icon="pen"
                color={isSelected ? theme.buttonText.color : theme.colors.primary}
                style={styles.icon}
                onPress={(e) => handleEdit(e, text.id)}
              />
              <IconButton
                color={isSelected ? theme.buttonText.color : theme.colors.primary}
                icon="trash-alt"
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
