import React from 'react';
import { withTheme } from 'react-native-paper';
import { StateContext } from '../../../../controllers/state';
import WarnModal from '../../../../template/WarnModal';
import NotifyModal from '../../../../template/NotifyModal';
import API from '../../../../controllers/AuthApi';

const { logout } = API;

const Logout = ({ theme, setIsVisible, isVisible }) => {
  const { setIsLoading } = React.useContext(StateContext);
  const [showErrorModal, setShowErrorModal] = React.useState(null);
  const changePasswordOk = () => {
    setIsLoading(true);
    logout((e) => {
      if (!e) {
        setIsVisible(false);
      } else {
        setIsLoading(false);
        setShowErrorModal(e);
      }
    });
  };

  return (
    <>
      <WarnModal
        buttonText="Logout"
        theme={theme}
        content="You sure you wanna log out?"
        onPress={changePasswordOk}
        visible={isVisible}
        setVisible={setIsVisible}
      />
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

export default withTheme(Logout);
