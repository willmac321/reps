import React from 'react';
import { withTheme, Text, TextInput } from 'react-native-paper';
import { StateContext } from '../../../../controllers/state';
import WarnModal from '../../../../template/WarnModal';
import NotifyModal from '../../../../template/NotifyModal';
import API from '../../../../controllers/AuthApi';

const { deleteAccount } = API;

const DeleteAccount = ({ theme, setIsVisible, isVisible, confirmString }) => {
  const { setIsLoading } = React.useContext(StateContext);
  const [text, setText] = React.useState('');
  const [showErrorModal, setShowErrorModal] = React.useState(null);
  const deleteAccountOk = () => {
    if (text.toLowerCase() === confirmString) {
      setIsLoading(true);
      deleteAccount(text, (e) => {
        setText('');
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
    setText('');
  }, [isVisible]);

  return (
    <>
      <WarnModal
        buttonText="Delete"
        theme={theme}
        content="You want to delete your account?  This can not be undone."
        onPress={deleteAccountOk}
        visible={isVisible}
        setVisible={setIsVisible}
      >
        <Text style={{ margin: 10 }}>
          Enter your password to confirm and get rid of the account forever.
        </Text>
        <TextInput
          mode="outlined"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry
          label="Password"
          styles={theme.input}
          theme={theme}
          value={text}
          onChangeText={(t) => setText(t)}
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

export default withTheme(DeleteAccount);
