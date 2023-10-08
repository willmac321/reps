import React from "react";
import { LayoutAnimation, Keyboard, KeyboardAvoidingView } from "react-native";
import { withTheme } from "react-native-paper";
import SafeArea from "../../../template/SafeAreaWrapper";
import { StateContext } from "../../../controllers/state";
import WarnModal from "../../../template/WarnModal";
import Workouts from "../Workouts/parts/Workouts";
import NewWorkout from "./parts/NewWorkout";
import { useIsMounted } from "../../../utils/useIsMounted";
import { useFocusEffect } from "@react-navigation/native";

const NewWorkoutsScreen = ({ navigation, theme }) => {
  const [showNotify, setShowNotify] = React.useState(false);
  const [isOk, setIsOk] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState("");
  const [notifyTitle, setNotifyTitle] = React.useState("");
  const [keyboardActive, setKeyboardActive] = React.useState(false);
  const isMounted = useIsMounted();
  const {
    workouts: { workouts, getWorkouts },
    user,
    editWorkout: { editWorkout },
    isFromEditButton,
    setIsFromEditButton,
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

  useFocusEffect(
    React.useCallback(() => {
      if (isMounted.current && editWorkout) {
        setIsEditWorkout(Object.keys(editWorkout).length > 0);
      }
    }, [isMounted.current])
  );

  useFocusEffect(
    React.useCallback(() => {
      const keyboardShow = Keyboard.addListener(
        "keyboardDidShow",
        keyboardEventShow
      );
      const keyboardHide = Keyboard.addListener(
        "keyboardDidHide",
        keyboardEventHide
      );

      // cleanup function
      return () => {
        keyboardShow.remove();
        keyboardHide.remove();
      };
    }, [])
  );

  return (
    <SafeArea>
      <KeyboardAvoidingView
        style={{
          flex: !isFromEditButton || !isEditWorkout ? 1 : null,
          flexGrow: !isFromEditButton || !isEditWorkout ? 1 : null,
        }}
      >
        <NewWorkout
          data={workouts}
          navigation={navigation}
          theme={theme}
          user={user}
          style={{ flex: !isFromEditButton || !isEditWorkout ? 1 : null }}
        />
        {(!isFromEditButton || !isEditWorkout) && !keyboardActive && (
          <Workouts
            navigation={navigation}
            setMessage={setNotifyMessage}
            setNotifyTitle={setNotifyTitle}
            setShowNotify={(v) => {
              setIsFromEditButton(false);
              setShowNotify(v);
            }}
            isOk={isOk}
            setIsOk={setIsOk}
            isEditScreen
            showEdit={false}
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
          setIsCancel={() => setIsFromEditButton(false)}
        />
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default withTheme(NewWorkoutsScreen);
