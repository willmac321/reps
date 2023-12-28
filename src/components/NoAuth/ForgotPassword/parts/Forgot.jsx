import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, TextInput, HelperText } from 'react-native-paper';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import CardWithButton from '../../../../template/CardWithButton';
import NotifyModal from '../../../../template/NotifyModal';
import API from '../../../../controllers/AuthApi';

const Forgot = ({ theme, style }) => {
  const linkTo = useLinkTo()
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [content, setContent] = React.useState('Password reset email sent, check your email.');
  const [isDisable, setIsDisable] = React.useState(false);
  const [showResetPassword, setShowResetPassword] = React.useState(false);
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

  const resetEmail = () => {
    setIsLoading(true);
    API.forgot(email, (err) => {
      setIsLoading(false);
      if (err) {
        setContent(err.message.toString());
        setIsError(true);
      }
      setShowResetPassword(true);
    });
  };

  const handleShowReset = () => {
    if (isError) {
      setContent('Password reset email sent, check your email.');
      setIsError(false);
    } else {
      linkTo('/noauth/login');
    }
  };

  return (
    <View theme={theme}>
      <CardWithButton
        title="Forgotten password? Try your email"
        buttonText="Submit"
        buttonDisabled={isDisable}
        showButton
        theme={theme}
        style={style}
        onPress={resetEmail}
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
      <NotifyModal
        title="Alrighty then..."
        buttonText="Ok"
        theme={theme}
        content={content}
        onPress={handleShowReset}
        setIsVisible={setShowResetPassword}
        isVisible={showResetPassword}
      />
    </View>
  );
};

export default withTheme(Forgot);
