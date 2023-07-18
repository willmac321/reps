import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText } from 'react-native-paper';
import { Link } from '@react-navigation/native';
import CardWithButton from '../../../../template/CardWithButton';
import API from '../../../../controllers/AuthApi';
import { useIsMounted } from '../../../../utils/useIsMounted';

const Login = ({ theme, style, setShowNotify, setNotifyMessage, setNotifyTitle }) => {
  const isMounted = useIsMounted();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
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

  const emailError = () => isMounted.current && email && !email.includes('@');

  React.useEffect(() => {
    if (isMounted.current) {
      if (!password || !email || emailError()) {
        setIsDisable(true);
      } else {
        setIsDisable(false);
      }
    }
  }, [password, email]);

  const callbackHandlePress = (err, user) => {
    if (isMounted.current) {
      setIsLoading(false);
      if (err) {
        setNotifyTitle('Uhoh Brobro!');
        setNotifyMessage(err.message.toString());
        setShowNotify(true);
        return;
      }
      if (!user.emailVerified) {
        setNotifyTitle('But really...');
        setNotifyMessage('Please verify your email to continue using REPS.');
        setShowNotify(true);
      }
    }
  };

  const handleOnPress = () => {
    setIsLoading(true);
    API.login(email, password, callbackHandlePress);
  };

  return (
    <View theme={theme}>
      <CardWithButton
        title="Please Login"
        buttonText="Submit"
        theme={theme}
        style={style}
        buttonDisabled={isDisable}
        onPress={handleOnPress}
        isLoading={isLoading}
        showButton
      >
        <TextInput
          mode="outlined"
          theme={theme}
          keyboardType="email-address"
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
        <TextInput
          mode="outlined"
          theme={theme}
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={!isPasswordVisible}
          label="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          style={styles.input}
          right={
            <TextInput.Icon icon="eye" onPress={() => setPasswordVisible(!isPasswordVisible)} />
          }
        />
        <Link style={styles.link} to="/Forgot">
          Forgot Password?
        </Link>
      </CardWithButton>
    </View>
  );
};

export default withTheme(Login);
