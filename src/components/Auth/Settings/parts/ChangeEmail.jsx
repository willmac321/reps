import React from 'react';
import { withTheme, HelperText, TextInput } from 'react-native-paper';
import { StateContext } from '../../../../controllers/state';
import WarnModal from '../../../../template/WarnModal';
import NotifyModal from '../../../../template/NotifyModal';
import API from '../../../../controllers/AuthApi';

const { changeEmail } = API;

const ChangeEmail = ({ theme, setIsVisible, isVisible }) => {
  const { setIsLoading } = React.useContext(StateContext);
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [showErrorModal, setShowErrorModal] = React.useState(null);

  const emailError = () => email && !email.includes('@');

  const changeEmailOk = () => {
    if (password && email && !emailError()) {
      setIsLoading(true);
      changeEmail(password, email, (e) => {
        setPassword('');
        setEmail('');
        if (!e) {
          setIsVisible(false);
        } else {
          setIsLoading(false);
          setShowErrorModal(e);
        }
      });
    }
  };

  React.useEffect(() => {
    setPassword('');
    setEmail('');
  }, [isVisible]);

  return (
    <>
      <WarnModal
        buttonText="Reset"
        theme={theme}
        content="Enter your current password followed by the new email address."
        onPress={changeEmailOk}
        visible={isVisible}
        setVisible={setIsVisible}
      >
        <TextInput
          mode="outlined"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry
          label="Password"
          style={theme.input}
          theme={theme}
          value={password}
          onChangeText={(t) => setPassword(t)}
        />
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
          style={theme.input}
        />
        {!!emailError() && (
          <HelperText type="error" visible={emailError()}>
            Email address is invalid!
          </HelperText>
        )}
      </WarnModal>
      <NotifyModal
        title="Error"
        buttonText="OK"
        theme={theme}
        content={showErrorModal}
        onPress={() => setShowErrorModal(null)}
        isVisible={showErrorModal}
        setIsVisible={() => setShowErrorModal(null)}
      />
    </>
  );
};

export default withTheme(ChangeEmail);
