import React from 'react';
import { withTheme, Text, TextInput } from 'react-native-paper';
import { StateContext } from '../../../../controllers/state';
import WarnModal from '../../../../template/WarnModal';
import NotifyModal from '../../../../template/NotifyModal';
import API from '../../../../controllers/AuthApi';

const { resetPassword } = API;

const ResetPassword = ({ theme, setIsVisible, isVisible }) => {
  const { setIsLoading } = React.useContext(StateContext);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newConfirmPassword, setNewConfirmPassword] = React.useState('');
  const [showErrorModal, setShowErrorModal] = React.useState(null);
  const changePasswordOk = () => {
    if (oldPassword && newPassword && newPassword === newConfirmPassword) {
      setIsLoading(true);
      resetPassword(oldPassword, newPassword, (e) => {
        setOldPassword('');
        setNewPassword('');
        setNewConfirmPassword('');
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
    setOldPassword('');
    setNewPassword('');
    setNewConfirmPassword('');
  }, [isVisible]);

  return (
    <>
      <WarnModal
        buttonText="Reset"
        theme={theme}
        content="Enter your old password followed by the new one."
        onPress={changePasswordOk}
        visible={isVisible}
        setVisible={setIsVisible}
      >
        <TextInput
          mode="outlined"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry
          label="Old Password"
          styles={theme.input}
          theme={theme}
          value={oldPassword}
          onChangeText={(t) => setOldPassword(t)}
        />
        <TextInput
          mode="outlined"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry
          label="New Password"
          styles={theme.input}
          theme={theme}
          value={newPassword}
          onChangeText={(t) => setNewPassword(t)}
        />
        <TextInput
          mode="outlined"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry
          label="ReEnter New Password"
          styles={theme.input}
          theme={theme}
          value={newConfirmPassword}
          onChangeText={(t) => setNewConfirmPassword(t)}
        />
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

export default withTheme(ResetPassword);
