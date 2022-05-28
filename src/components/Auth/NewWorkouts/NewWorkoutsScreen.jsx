import React from 'react';
import { LayoutAnimation, Keyboard, KeyboardAvoidingView } from 'react-native';
import { withTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StateContext } from '../../../controllers/state';
import WarnModal from '../../../template/WarnModal';
import Workouts from '../Workouts/parts/Workouts';
import NewWorkout from './parts/NewWorkout';
import { useIsMounted } from '../../../utils/useIsMounted';
import { isMobile } from '../../../utils/checkPlatform.jsx';

const NewWorkoutsScreen = ({ navigation, theme }) => {
  const [showNotify, setShowNotify] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');
  const [keyboardActive, setKeyboardActive] = React.useState(false);
  const isMounted = useIsMounted();
  const {
    workouts: { workouts },
    user,
    editWorkout: { editWorkout },
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

  React.useLayoutEffect(() => {
    if (isMounted.current && editWorkout) {
      setIsEditWorkout(Object.keys(editWorkout).length > 0);
    }
  }, [isMounted.current, editWorkout]);

  React.useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow', keyboardEventShow);
    const keyboardHide = Keyboard.addListener('keyboardDidHide', keyboardEventHide);

    // cleanup function
    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  return (
    <SafeAreaView style={isMobile() ? { flexGrow: 1 } : {}}>
      <KeyboardAvoidingView
        behavior={isMobile() ? 'padding' : 'height'}
        style={{
          flex: !isEditWorkout ? 1 : null,
          flexGrow: !isEditWorkout ? 1 : null,
        }}
      >
        <NewWorkout
          data={workouts}
          navigation={navigation}
          theme={theme}
          user={user}
          style={{ flex: !isEditWorkout ? 1 : null }}
        />
        {!isEditWorkout && !keyboardActive && (
          <Workouts
            navigation={navigation}
            setMessage={setNotifyMessage}
            setNotifyTitle={setNotifyTitle}
            setShowNotify={setShowNotify}
            showEditAndSelect={false}
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
    </SafeAreaView>
  );
};

export default withTheme(NewWorkoutsScreen);
