import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, LayoutAnimation, UIManager } from 'react-native';
import { withTheme } from 'react-native-paper';
import { StateContext } from '../../../controllers/state';
import WarnModal from '../../../template/WarnModal';
import NewExercise from './parts/NewExercise';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NewExerciseScreen = ({ navigation, theme }) => {
  const [showNotify, setShowNotify] = React.useState(false);
  const [customTopMargin, setCustomTopMargin] = React.useState(theme.card.marginTop);
  const [isOk, setIsOk] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');

  const keyboardEventShow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setCustomTopMargin(50);
  };

  const keyboardEventHide = () => {
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
    <StateContext.Consumer>
      {({ selectedWorkout: { selectedWorkout }, exercises: { exercises, setExercises } }) => (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <NewExercise
            exercises={exercises}
            setExercises={setExercises}
            workout={selectedWorkout}
            navigation={navigation}
            style={{ marginTop: customTopMargin }}
            theme={theme}
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
        </KeyboardAvoidingView>
      )}
    </StateContext.Consumer>
  );
};

export default withTheme(NewExerciseScreen);
