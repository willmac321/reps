import React from 'react';
import { withTheme, Card } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
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
  showButton,
  flex,
}) => {
  const styles = StyleSheet.create({
    title: theme.title,
    card: theme.card,
  });

  return (
    <Card theme={theme} style={[styles.card, style]}>
      {title && <Card.Title theme={theme} titleStyle={styles.title} title={title} />}
      <Card.Content style={{ flex, marginTop: title ? 'auto' : 20 }}>{children}</Card.Content>
      <Card.Actions>
        {showButton && (
          <ButtonTemplate
            theme={theme}
            onPress={onPress}
            isLoading={isLoading}
            disabled={buttonDisabled}
          >
            {buttonText}
          </ButtonTemplate>
        )}
      </Card.Actions>
    </Card>
  );
};

export default withTheme(CardWithButton);
