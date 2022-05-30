import React, { useEffect } from 'react';
import { Keyboard, LayoutAnimation, UIManager, ScrollView } from 'react-native';
import { withTheme } from 'react-native-paper';
import SafeArea from '../../../template/SafeAreaWrapper';
import { StateContext } from '../../../controllers/state';
import WarnModal from '../../../template/WarnModal';
import Header from '../../../template/Header';
import NewExerciseCreator from './parts/NewExerciseCreator';
import NewExercises from './parts/NewExercises';
import NewExerciseNext from './parts/NewExerciseNext';
import { isMobile, isAndroid } from '../../../utils/checkPlatform';

if (isAndroid() && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NewExerciseScreen = ({ navigation, theme }) => {
  const {
    isLoading,
    user = null,
    selectedWorkout: { selectedWorkout },
    exercises: { exercises, setExercises, getExercises },
  } = React.useContext(StateContext);
  const scroll = React.useRef(null);
  const keyboardShow = React.useRef(null);
  const keyboardHide = React.useRef(null);
  const [keyboardActive, setKeyboardActive] = React.useState(false);
  const [showNotify, setShowNotify] = React.useState(false);
  const [customTopMargin, setCustomTopMargin] = React.useState(theme.card.marginTop);
  const [isOk, setIsOk] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState('');
  const [notifyTitle, setNotifyTitle] = React.useState('');
  const [selectedExercise, setSelectedExercise] = React.useState(null);

  useEffect(() => {
    if (selectedWorkout) getExercises(true, selectedWorkout);
  }, [selectedWorkout]);

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

  const [markSelected, setMarkSelected] = React.useState(null);

  React.useEffect(() => {
    keyboardShow.current = Keyboard.addListener('keyboardDidShow', keyboardEventShow);
    keyboardHide.current = Keyboard.addListener('keyboardDidHide', keyboardEventHide);

    // cleanup function
    return () => {
      keyboardShow.current.remove();
      keyboardHide.current.remove();
    };
  }, []);

  return (
    <SafeArea>
      <ScrollView
        ref={scroll}
        style={[
          {
            scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
          },
          isMobile() ? {} : { overflow: 'auto' },
        ]}
      >
        {selectedWorkout && selectedWorkout.title && (
          <Header title={`${selectedWorkout.title} - ${selectedWorkout.date}`} theme={theme} />
        )}
        <NewExerciseCreator
          exercises={exercises}
          addExerciseToList={(val) => {
            if (val) {
              setExercises(val);
              setMarkSelected(val.id || null);
            } else {
              setSelectedExercise(null);
              setMarkSelected(null);
            }
          }}
          workout={selectedWorkout}
          navigation={navigation}
          style={{ marginTop: customTopMargin }}
          user={user}
          theme={theme}
          prepopulateData={selectedExercise}
        />
        {!keyboardActive && (
          <>
            <NewExerciseNext theme={theme} navigation={navigation} />
            <NewExercises
              isLoading={isLoading}
              navigation={navigation}
              theme={theme}
              setShowNotify={setShowNotify}
              showEditAndSelect={false}
              markSelected={markSelected}
              setMarkSelected={setMarkSelected}
              setSelectedExercise={setSelectedExercise}
              setIsOk={setIsOk}
              isOk={isOk}
              setNotifyTitle={setNotifyTitle}
              setNotifyMessage={setNotifyMessage}
              showScrollView={false}
            />
          </>
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
      </ScrollView>
    </SafeArea>
  );
};

export default withTheme(NewExerciseScreen);
