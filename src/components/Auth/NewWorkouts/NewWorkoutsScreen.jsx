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
  const isMounted = React.useRef(true);
  const {
    workouts: { workouts },
    user,
    selectedWorkout: { selectedWorkout, setSelectedWorkout },
  } = React.useContext(StateContext);

  const [isEditWorkout, setIsEditWorkout] = React.useState(false);

  const keyboardEventShow = () => {
    setKeyboardActive(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  const keyboardEventHide = () => {
    setKeyboardActive(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      setIsEditWorkout(Object.keys(selectedWorkout).length > 0);
    }
  }, [isMounted.current]);

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
      {!isEditWorkout && !keyboardActive && (
        <Workouts
          navigation={navigation}
          setMessage={setNotifyMessage}
          setNotifyTitle={setNotifyTitle}
          setShowNotify={setShowNotify}
          isOk={isOk}
          setIsOk={setIsOk}
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
  );
};

export default withTheme(NewWorkoutsScreen);
