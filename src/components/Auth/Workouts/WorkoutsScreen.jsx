import React from 'react';
import { withTheme } from 'react-native-paper';
import SafeArea from '../../../template/SafeAreaWrapper';
import WarnModal from '../../../template/WarnModal';
import Workouts from './parts/Workouts';

const WorkoutsScreen = ({ navigation, theme }) => {
  const [showNotify, setShowNotify] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');

  return (
    <SafeArea theme={theme}>
      <Workouts
        navigation={navigation}
        setMessage={setNotifyMessage}
        setNotifyTitle={setNotifyTitle}
        setShowNotify={setShowNotify}
        isOk={isOk}
        setIsOk={setIsOk}
      />
      <WarnModal
        title={notifyTitle}
        buttonText="Yes"
        theme={theme}
        content={notifyMessage}
        visible={showNotify}
        setVisible={(res) => {
          setShowNotify(res);
        }}
        onPress={() => setIsOk(true)}
      />
    </SafeArea>
  );
};

export default withTheme(WorkoutsScreen);
