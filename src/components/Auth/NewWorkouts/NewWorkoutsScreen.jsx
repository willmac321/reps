import React from 'react';
import { Platform, LayoutAnimation, Keyboard, KeyboardAvoidingView } from 'react-native';
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
  const [keyboardActive, setKeyboardActive] = React.useState(false);
  const {
    user,
    workouts: { getWorkouts },
  } = React.useContext(StateContext);

  const keyboardEventShow = () => {
    setKeyboardActive(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  const keyboardEventHide = () => {
    setKeyboardActive(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  React.useEffect(() => {
    if (user.uid) {
      console.log(user.uid);
      //FIXME why does this get run 1 million times
    //  getWorkouts();
    }
  }, [user.uid]);

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardEventShow);
    Keyboard.addListener('keyboardDidHide', keyboardEventHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardEventShow);
      Keyboard.removeListener('keyboardDidHide', keyboardEventHide);
    };
  }, []);

  return (
    <StateContext.Consumer>
      {({
        selectedWorkout: { setSelectedWorkout },
        workouts: { workouts = [], setWorkouts = () => {} },
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, flexGrow: 1 }}
        >
          <NewWorkout
            addWorkoutToList={setSelectedWorkout}
            data={workouts}
            navigation={navigation}
            theme={theme}
            user={user}
            style={{ flex: 1 }}
          />
          {!keyboardActive && (
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
              userUid={user ? user.uid : null}
            />
          )}
          <WarnModal
            title={notifyTitle}
            buttonText="Yes"
            theme={theme}
            content={notifyMessage}
            visible={showNotify}
            setVisible={setShowNotify}
            onPress={() => setIsOk(true)}
          />
        </KeyboardAvoidingView>
      )}
    </StateContext.Consumer>
  );
};

export default withTheme(NewWorkoutsScreen);
