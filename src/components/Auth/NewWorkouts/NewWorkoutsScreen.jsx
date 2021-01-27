import React from 'react';
import { withTheme } from 'react-native-paper';
import WarnModal from '../../../template/WarnModal';
import Workouts from '../Workouts/parts/Workouts';
import NewWorkout from './parts/NewWorkout';

const NewWorkoutsScreen = ({ navigation, theme }) => {
  const [showNotify, setShowNotify] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');
  return (
    <>
      <NewWorkout navigation={navigation} theme={theme} />
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
        setVisible={setShowNotify}
        onPress={() => setIsOk(true)}
      />
    </>
  );
};

export default withTheme(NewWorkoutsScreen);
