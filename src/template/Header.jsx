import React from 'react';
import { withTheme, List } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import CardWithButton from './CardWithButton';

const Header = ({ theme, title }) => {
  const styles = StyleSheet.create({
    text: { ...theme.buttonText, color: theme.colors.primary },
    item: {
      ...theme.item,
      padding: 0,
      borderWidth: 0,
    },
    card: {
      marginTop: 10,
      marginBottom: 0,
    },
  });
  return (
    <CardWithButton theme={theme} showButton={false} flex={1} style={styles.card}>
      <List.Item
        title={title}
        titleNumberOfLines={1}
        titleEllipsizeMode="tail"
        theme={theme}
        titleStyle={styles.text}
        style={styles.item}
      />
    </CardWithButton>
  );
};
export default withTheme(Header);
