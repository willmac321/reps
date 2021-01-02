import React from 'react';
import { withTheme, Card, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const CardWithButton = ({ children, title, buttonText, theme, onPress, isLoading, style }) => {
  const styles = StyleSheet.create({
    title: theme.title,
    button: theme.button,
    buttonText: theme.buttonText,
    card: theme.card,
  });

  return (
    <Card theme={theme} style={[styles.card, style]}>
      <Card.Title theme={theme} titleStyle={styles.title} title={title} />
      <Card.Content>{children}</Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          labelStyle={styles.buttonText}
          style={styles.button}
          dark
          uppercase={false}
          theme={theme}
          onPress={onPress}
          loading={isLoading}
        >
          {buttonText}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default withTheme(CardWithButton);
