import React from 'react';
import { withTheme } from 'react-native-paper';
import { StateContext } from '../../../../controllers/state';
import WarnModal from '../../../../template/WarnModal';
import NotifyModal from '../../../../template/NotifyModal';
import { removeLocalData } from '../../../../firebase/localStorage';
import { useIsMounted } from '../../../../utils/useIsMounted';

const Logout = ({ theme, setIsVisible, isVisible }) => {
  const isMounted = useIsMounted();
  const { setIsLoading, logout } = React.useContext(StateContext);
  const [showErrorModal, setShowErrorModal] = React.useState(null);
  const changePasswordOk = async () => {
    setIsLoading(true);
    await removeLocalData();
    logout();
    if (isMounted.current) {
      setIsVisible(false);
    }
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
