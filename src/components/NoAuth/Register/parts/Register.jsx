import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText, Text } from 'react-native-paper';
import { StateContext } from '../../../../controllers/state';
import CardWithButton from '../../../../template/CardWithButton';
import AuthAPI from '../../../../controllers/AuthApi';
import UserSettingsAPI from '../../../../controllers/UserSettingsApi';

const Register = ({
  theme,
  style,
  navigation,
  setShowNotify,
  setNotifyMessage,
  setNotifyTitle,
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [reenterPassword, setReenterPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);
  const styles = StyleSheet.create({
    input: theme.input,
  });

  const { defaultUserDetails } = React.useContext(StateContext);

  React.useEffect(() => {
    if (!password || !reenterPassword || !email || password !== reenterPassword) {
      if (password !== reenterPassword) {
        setIsError(true);
      }
      setIsDisable(true);
    } else {
      setIsDisable(false);
      setIsError(false);
    }
    return () => {
      setIsDisable(false);
      setIsError(false);
    };
  }, [password, reenterPassword, email]);

  const emailError = () => email && !email.includes('@');

  const callbackHandlePress = (err, uid) => {
    setIsLoading(false);
    if (err) {
      setNotifyTitle('Uhoh!');
      setNotifyMessage(err.message.toString());
      setShowNotify(true);
      return;
    }
    UserSettingsAPI.updateSettings(uid, defaultUserDetails);
  };

  const handleOnPress = (setJustRegistered) => {
    setJustRegistered(true);
    setIsLoading(true);
    AuthAPI.register(email, password, callbackHandlePress);
  };

  return (
    <View theme={theme}>
      <StateContext.Consumer>
        {({ setJustRegistered }) => (
          <CardWithButton
            title="Ready to party?"
            buttonText="Submit"
            buttonDisabled={isDisable}
            showButton
            theme={theme}
            style={style}
            onPress={() => handleOnPress(setJustRegistered)}
            isLoading={isLoading}
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
              secureTextEntry
              error={isError}
              label="Password"
              value={password}
              onChangeText={(val) => setPassword(val)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              theme={theme}
              autoCompleteType="password"
              textContentType="password"
              secureTextEntry
              error={isError}
              label="Re-enter Password"
              value={reenterPassword}
              onChangeText={(val) => setReenterPassword(val)}
              style={styles.input}
            />
            {!!isError && (
              <HelperText type="error" visible={isError}>
                Passwords do not match!
              </HelperText>
            )}
            <Text>By selecting submit I agree to the privacy policy and terms of service</Text>
          </CardWithButton>
        )}
      </StateContext.Consumer>
    </View>
  );
};

export default withTheme(Register);
