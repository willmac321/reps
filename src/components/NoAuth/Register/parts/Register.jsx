import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText, Text, Checkbox } from 'react-native-paper';
import { StateContext } from '../../../../controllers/state';
import CardWithButton from '../../../../template/CardWithButton';
import AuthAPI from '../../../../controllers/AuthApi';
import UserSettingsAPI from '../../../../controllers/UserSettingsApi';
import LegalPrivacy from '../../Legal/LegalPrivacy';
import {useLinkTo} from '@react-navigation/native';

const Register = ({
  theme,
  style,
  navigation,
  setShowNotify,
  setNotifyMessage,
  setNotifyTitle,
}) => {
  const linkTo = useLinkTo();
  const [email, setEmail] = React.useState('');
  const [acceptedEULA, setAcceptedEULA] = React.useState(false);
  const [eulaVis, setEulaVis] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [reenterPassword, setReenterPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);
  const styles = StyleSheet.create({
    input: theme.input,
    text: {
      flex: 1,
      flexGrow: 1,
      flexWrap: 'wrap',
      wordBreak: 'break-word',
      margin: 'auto',
      flexDirection: 'row',
    },
    link: {
      fontSize: 16,
    },
    link_text: {
      color: theme.colors.link,
      fontSize: 16,
    },
  });

  const { defaultUserDetails } = React.useContext(StateContext);

  React.useEffect(() => {
    if (!password || !reenterPassword || !email || password !== reenterPassword || !acceptedEULA) {
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
  }, [password, reenterPassword, email, acceptedEULA]);

  const emailError = () => email && !email.includes('@');

  const callbackHandlePress = async (err, uid) => {
    setIsLoading(false);
    if (err) {
      setNotifyTitle('Uhoh!');
      setNotifyMessage(err.message.toString().split('Firebase: ')[1]);
      setShowNotify(true);
      return;
    }
    await UserSettingsAPI.updateSettings(uid, defaultUserDetails);
    await UserSettingsAPI.setAckPrivacy(uid);
    linkTo('/noauth/login');
  };

  const handleOnPress = (setJustRegistered) => {
    if (acceptedEULA) {
      setJustRegistered(true);
      setIsLoading(true);
      AuthAPI.register(email, password, callbackHandlePress);
    }
  };

  return (
    <View theme={theme}>
      <StateContext.Consumer>
        {({ setJustRegistered }) => (
          <View>
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
              <View style={styles.text}>
                <Checkbox
                  theme={theme}
                  color={theme.colors.text}
                  status={acceptedEULA ? 'checked' : 'unchecked'}
                  onPress={() => setAcceptedEULA(!acceptedEULA)}
                  style={[styles.link, {}]}
                />
                <Text style={{ margin: 'auto', flex: 10 }}>
                  <Text style={styles.link}>I agree to the</Text>{' '}
                  <Text onPress={() => setEulaVis(!eulaVis)} style={styles.link_text}>
                    privacy policy and terms of service.
                  </Text>
                </Text>
              </View>
            </CardWithButton>
            <LegalPrivacy
              navigation={navigation}
              theme={theme}
              isVisible={eulaVis}
              setIsVisible={setEulaVis}
            />
          </View>
        )}
      </StateContext.Consumer>
    </View>
  );
};

export default withTheme(Register);
