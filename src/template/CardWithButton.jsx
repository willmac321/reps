import React from 'react';
import { withTheme, Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import ButtonTemplate from './ButtonTemplate';

const CardWithButton = ({
  children,
  title,
  buttonText,
  theme,
  onPress,
  isLoading,
  style,
  buttonDisabled,
}) => {
  const styles = StyleSheet.create({
    title: theme.title,
    card: theme.card,
  });

  return (
    <Card theme={theme} style={[styles.card, style]}>
      <Card.Title theme={theme} titleStyle={styles.title} title={title} />
      <Card.Content>{children}</Card.Content>
      <Card.Actions>
        <ButtonTemplate
          theme={theme}
          onPress={onPress}
          isLoading={isLoading}
          disabled={buttonDisabled}
        >
          {buttonText}
        </ButtonTemplate>
      </Card.Actions>
    </Card>
  );
};

export default withTheme(CardWithButton);
