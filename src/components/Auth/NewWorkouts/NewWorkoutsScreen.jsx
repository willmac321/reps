import React from 'react';
import { withTheme } from 'react-native-paper';
import { StateContext } from '../../../controllers/state';
import WarnModal from '../../../template/WarnModal';
import Workouts from '../Workouts/parts/Workouts';
import NewWorkout from './parts/NewWorkout';

const NewWorkoutsScreen = ({ navigation, theme }) => {
  const [showNotify, setShowNotify] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');
  return (
    <StateContext.Consumer>
      {({
        selectedWorkout: { setSelectedWorkout },
        workouts: { workouts = [], setWorkouts = () => {} },
        user = null,
      }) => (
        <>
          <NewWorkout
            addWorkoutToList={setSelectedWorkout}
            data={workouts}
            navigation={navigation}
            theme={theme}
            user={user}
          />
          <Workouts
            data={workouts}
            setData={setWorkouts}
            navigation={navigation}
            setSelectedWorkout={setSelectedWorkout}
            setSelected
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
      )}
    </StateContext.Consumer>
  );
};

export default withTheme(NewWorkoutsScreen);
