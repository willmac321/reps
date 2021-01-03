import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText } from 'react-native-paper';
import { Link } from '@react-navigation/native';
import CardWithButton from '../../../template/CardWithButton';

const Login = ({ theme, style }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);
  const styles = StyleSheet.create({
    input: theme.input,
    link: {
      marginTop: 20,
      marginBottom: 10,
      fontSize: 16,
      color: theme.colors.link,
      marginLeft: 5,
    },
  });

  const emailError = () => email && !email.includes('@');

  React.useEffect(() => {
    if (!password || !email || emailError()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [password, email]);

  return (
    <View theme={theme}>
      <CardWithButton
        title="Please Login"
        buttonText="Submit"
        theme={theme}
        style={style}
        buttonDisabled={isDisable}
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
        {emailError() && (
          <HelperText type="error" visible={emailError()}>
            Email address is invalid!
          </HelperText>
        )}
        <TextInput
          mode="outlined"
          theme={theme}
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry
          label="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          style={styles.input}
        />
        <Link style={styles.link} to="/Splash">
          Forgot Password?
        </Link>
      </CardWithButton>
    </View>
  );
};

export default withTheme(Login);
