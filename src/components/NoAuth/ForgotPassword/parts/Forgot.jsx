import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText } from 'react-native-paper';
import CardWithButton from '../../../../template/CardWithButton';

const Forgot = ({ theme, style }) => {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);
  const styles = StyleSheet.create({
    input: theme.input,
  });

  React.useEffect(() => {
    if (!email) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email]);

  const emailError = () => email && !email.includes('@');

  return (
    <View theme={theme}>
      <CardWithButton
        title="Forgotten password? Try your email"
        buttonText="Submit"
        buttonDisabled={isDisable}
        showButton
        theme={theme}
        style={style}
        onPress={() => setIsLoading(!isLoading)}
        isLoading={isLoading}
      >
        <TextInput
          mode="outlined"
          theme={theme}
          autoCompleteType="email"
          textContentType="emailAddress"
          label="Email"
          value={email}
          error={emailError()}
          onChangeText={(val) => setEmail(val)}
          style={styles.input}
        />
        {!!emailError() && (
          <HelperText type="error" visible={emailError()}>
            Email address is invalid!
          </HelperText>
        )}
      </CardWithButton>
    </View>
  );
};

export default withTheme(Forgot);
