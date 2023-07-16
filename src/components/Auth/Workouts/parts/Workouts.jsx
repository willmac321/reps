import React from 'react';
import { withTheme, List, IconButton } from 'react-native-paper';
import { View, Animated, Easing } from 'react-native';
import { StateContext } from '../../../../controllers/state';
import CardWithButton from '../../../../template/CardWithButton';
import ScrollList from '../../../../template/ScrollList';
import WorkoutItem from './WorkoutItem';
import WorkoutAPI from '../../../../controllers/WorkoutApi';
import { useIsMounted } from '../../../../utils/useIsMounted';
// remove

const Workouts = ({
  theme,
  navigation,
  setMessage,
  setNotifyTitle,
  setShowNotify,
  isOk,
  setIsOk,
  showEditAndSelect = true,
}) => {
  const {
    user,
    setIsFromEditButton,
    selectedWorkout: { setSelectedWorkout },
    editWorkout: { setEditWorkout },
    workouts: { workouts, setWorkouts },
    isLoading,
  } = React.useContext(StateContext);

  const [isDisable, setIsDisable] = React.useState(true);

  const isMounted = useIsMounted();

  const [selected, setSelected] = React.useState(null);

  const [isDelete, setIsDelete] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [modalOnOkSelectedId, setModalOnOkSelected] = React.useState('');
  const springAnim = React.useRef(new Animated.Value(1)).current;
  const springOut = (callback) => {
    Animated.timing(springAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300,
      easing: Easing.out(Easing.exp),
    }).start(callback);
  };

  const panX = springAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const setUpdatedWorkout = (id) => {
    if (id) {
      setSelectedWorkout(workouts.find((a) => a.id === id.toString()));
    } else {
      setSelectedWorkout();
    }
  };

  const setWorkoutToEdit = React.useCallback(
    async (id) => {
      if (id) {
        await setEditWorkout(workouts.find((a) => a.title === id));
      } else {
        setEditWorkout({});
      }
    },
    [workouts]
  );

  const deleteWorkout = React.useCallback(
    async (id) => {
      if (id && user && user.uid && isMounted.current) {
        await WorkoutAPI.deleteWorkout(user.uid, id);
      }
      springOut(() => {
        setWorkoutToEdit();
        if (isMounted.current) {
          setIsOk(false);
          setModalOnOkSelected(null);
          setSelected(null);
        }
        springAnim.setValue(1);
        setWorkouts(() => [...workouts].filter((d) => d.id !== id));
        setModalOnOkSelected(null);
      });
    },
    [user, workouts]
  );

  const editWorkout = React.useCallback(
    async (id) => {
    console.log('ehere');
      await setWorkoutToEdit(id);
      setUpdatedWorkout({});
      navigation.navigate('Create', { screen: 'NewWorkout' });
      setModalOnOkSelected(null);
    },
    [user, workouts]
  );

  const handleOnSubmit = React.useCallback(
    async (id) => {
      setUpdatedWorkout(id);
      await setWorkoutToEdit();
      navigation.navigate('Exercises');
    },
    [workouts, isDisable]
  );

  const onPress = React.useCallback(
    (id) => {
      setIsFromEditButton(false);
      setIsDisable(false);
      if (selected === id) {
        setSelected(null);
        setIsDisable(true);
      } else {
        setSelected(id);
      }
    },
    [selected]
  );

  const handleEdit = (_, id) => {
    const workout = workouts.filter((d) => d.id === id)[0];
    setEditWorkout(workout || {});
    setIsFromEditButton(true);
    setIsDelete(false);
    setSelected(id);
    setIsDisable(true);
    setNotifyTitle('You wanna change this?');
    setMessage(`You're about to edit ${workout.title}, ok?`);
    setIsOk(false);
    setIsEdit(true);
    setModalOnOkSelected(workout.id);
    setShowNotify(true);
  };

  const handleTrash = (_, id) => {
    setIsFromEditButton(false);
    setIsEdit(false);
    setIsDisable(true);
    setSelected(id);
    setNotifyTitle('Woah, you sure...');
    setMessage(`Do you really want to delete ${workouts.filter((d) => d.id === id)[0].id}?`);
    setIsOk(false);
    setIsDelete(true);
    setModalOnOkSelected(id);
    setShowNotify(true);
  };

  const handleNew = () => {
    setIsFromEditButton(false);
    navigation.navigate('Create');
  };

  // TODO for quick nav to workout screen remove
  // useFocusEffect(
  //   useCallback(() => {
  //     if (isMounted.current && !isLoading && workouts && showEditAndSelect && workouts.length > 0) {
  //       onPress('r');
  //     }
  //   }, [workouts, isLoading, showEditAndSelect])
  // );
  // React.useEffect(() => {
  //   if (selected) {
  //     handleOnSubmit();
  //   }
  // }, [selected]);
  // ^^

  React.useEffect(() => {
    if (isMounted.current) {
    console.log('use layou8t effect', modalOnOkSelectedId);
      if (isOk && modalOnOkSelectedId) {
        if (isDelete) {
          deleteWorkout(modalOnOkSelectedId);
          setIsDelete(false);
        } else if (isEdit) {
    console.log('isEdit ehere');
          editWorkout(modalOnOkSelectedId);
          setIsEdit(false);
        }
        setIsOk(false);
      }
      if (!isOk && modalOnOkSelectedId) {
        setIsDisable(false);
      }
    }
  }, [isOk, modalOnOkSelectedId]);

  const Item = ({ item }) => (
    <Animated.View
      style={item && item.id === selected ? { transform: [{ translateX: panX }] } : null}
    >
      <WorkoutItem
        onPress={() => onPress(item.id)}
        isSelected={item && item.id === selected}
        text={item}
        handleTrash={handleTrash}
        handleEdit={handleEdit}
        showEditAndTrash={showEditAndSelect}
      />
    </Animated.View>
  );

  const EmptyComponent = () => (
    <List.Item
      title="Do you even lift? Try making a workout!"
      titleStyle={{
        ...theme.buttonText,
        color: theme.colors.primary,
      }}
      theme={theme}
      style={[
        theme.buttonText,
        {
          borderColor: theme.colors.primary,
          borderWidth: 2,
          borderRadius: 10,
          color: theme.colors.primary,
        },
      ]}
      onPress={handleNew}
      right={() => (
        <>
          <IconButton
            size={16}
            icon="plus-square"
            color={theme.colors.primary}
            style={{
              marginVertical: 20,
              ...theme.title,
            }}
            onPress={handleNew}
          />
        </>
      )}
    />
  );

  const ItemSeparator = () => (
    <View
      style={{
        marginTop: 16,
        marginBottom: 16,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderColor: theme.colors.primary,
        borderRadius: theme.roundness,
        borderWidth: 1,
        width: '90%',
      }}
    />
  );

  return (
    <CardWithButton
      buttonText="Select"
      showButton={showEditAndSelect && workouts && workouts.length > 0}
      theme={theme}
      buttonDisabled={isDisable}
      onPress={() => handleOnSubmit(selected)}
      isLoading={isLoading}
      flex={1}
      style={{
        flex: workouts && workouts.length > 0 ? 2 : null,
        marginBottom: 50,
      }}
    >
      <ScrollList
        data={workouts}
        renderItem={Item}
        keyExtractor={(item) => item && item.id}
        extraData={selected}
        theme={theme}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={EmptyComponent}
      />
    </CardWithButton>
  );
};

export default withTheme(Workouts);
