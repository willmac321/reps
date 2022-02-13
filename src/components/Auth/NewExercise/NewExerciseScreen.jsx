import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
  UIManager,
  ScrollView,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { StateContext } from '../../../controllers/state';
import WarnModal from '../../../template/WarnModal';
import Header from '../../../template/Header';
import NewExercise from './parts/NewExercise';
import Exercises from '../Exercises/parts/Exercises';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NewExerciseScreen = ({ navigation, theme }) => {
  const {
    user = null,
    selectedWorkout: { selectedWorkout },
    exercises: { exercises, setExercises },
  } = React.useContext(StateContext);
  const scroll = React.useRef(null);
  const [keyboardActive, setKeyboardActive] = React.useState(false);
  const [showNotify, setShowNotify] = React.useState(false);
  const [customTopMargin, setCustomTopMargin] = React.useState(theme.card.marginTop);
  const [isOk, setIsOk] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');
  const [selectedExercise, setSelectedExercise] = React.useState(null);

  React.useLayoutEffect(() => {
    if (selectedExercise && scroll.current) {
      scroll.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [selectedExercise]);

  const keyboardEventShow = () => {
    setKeyboardActive(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setCustomTopMargin(50);
  };

  const keyboardEventHide = () => {
    setKeyboardActive(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setCustomTopMargin(theme.card.marginTop);
  };

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
    <ScrollView
      ref={scroll}
      style={{
        overflow: 'auto',
        scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
      }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {selectedWorkout && selectedWorkout.title && (
          <Header title={`${selectedWorkout.title} - ${selectedWorkout.date}`} theme={theme} />
        )}
        <NewExercise
          exercises={exercises}
          addExerciseToList={setExercises}
          workout={selectedWorkout}
          navigation={navigation}
          style={{ marginTop: customTopMargin }}
          user={user}
          theme={theme}
          prepopulateData={selectedExercise}
        />
        {!keyboardActive && (
          <Exercises
            isLoading={false}
            navigation={navigation}
            theme={theme}
            setShowNotify={setShowNotify}
            showEditAndSelect={false}
            setSelectedExercise={setSelectedExercise}
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
    </ScrollView>
  );
};

export default withTheme(NewExerciseScreen);
