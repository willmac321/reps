import React from 'react';
import { withTheme, Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import ButtonTemplate from './ButtonTemplate';
import { isMobile } from '../utils/checkPlatform';

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
  titleRight,
}) => {
  const styles = StyleSheet.create({
    title: { ...theme.title, paddingTop: 5, flexDirection: 'row', marginRight: 8 },
    card: theme.card,
  });

  return (
    <Card theme={theme} style={[styles.card, style]}>
      {title && (
        <Card.Title
          theme={theme}
          titleStyle={styles.title}
          style={styles.title}
          titleNumberOfLines={isMobile() ? 2 : 1}
          title={title}
          right={titleRight}
          rightStyle={{ marginTop: 8 }}
        />
      )}
      <Card.Content
        style={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 'auto',
          ...flex,
          overflowY: 'auto',
          marginTop: title ? 'auto' : 20,
        }}
      >
        {children}
      </Card.Content>
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
