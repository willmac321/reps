import React from 'react';
import { withTheme, List, IconButton } from 'react-native-paper';
import { View, Animated, Easing } from 'react-native';
import { StateContext } from '../../../../controllers/state';
import CardWithButton from '../../../../template/CardWithButton';
import ScrollList from '../../../../template/ScrollList';
import WorkoutItem from './WorkoutItem';
import WorkoutAPI from '../../../../controllers/WorkoutApi';
import { useIsMounted } from '../../../../utils/useIsMounted';

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
    selectedWorkout: { setSelectedWorkout },
    editWorkout: { setEditWorkout },
    workouts: { workouts, setWorkouts },
    isLoading,
  } = React.useContext(StateContext);

  const [isDisable, setIsDisable] = React.useState(true);

  const isMounted = useIsMounted();

  // FIXME debug -- to null
  // test1234
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
    (id) => {
      if (id) {
        setEditWorkout(workouts.find((a) => a.title === id));
      } else {
        setEditWorkout({});
      }
    },
    [workouts]
  );

  const deleteWorkout = React.useCallback(
    (id) => {
      if (id && user && user.uid && isMounted.current) {
        WorkoutAPI.deleteWorkout(user.uid, id);
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

  const editWorkout = React.useCallback(() => {
    setWorkoutToEdit(selected);
    setUpdatedWorkout({});
    navigation.navigate('Create', { screen: 'NewWorkout' });
    setModalOnOkSelected(null);
  }, [selected, user, workouts]);

  const handleOnSubmit = React.useCallback(() => {
    setUpdatedWorkout(selected);
    setWorkoutToEdit();
    navigation.navigate('Exercises');
  }, [selected, workouts, isDisable]);

  // FIXME debug
  React.useEffect(() => {
    if (selected) {
      setIsDisable(false);
      setUpdatedWorkout(selected);
      setWorkoutToEdit();
      navigation.navigate('Exercises');
    }
  }, [workouts]);

  const onPress = (id) => {
    setIsDisable(false);
    setSelected(id);
  };

  const handleEdit = (_, id) => {
    setSelected(id);
    setIsDisable(true);
    setNotifyTitle('You wanna change this?');
    setMessage(`You're about to edit ${workouts.filter((d) => d.id === id)[0].id}, ok?`);
    setIsOk(false);
    setIsEdit(true);
    setModalOnOkSelected(id);
    setShowNotify(true);
  };

  const handleTrash = (_, id) => {
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
    navigation.navigate('Create');
  };

  React.useLayoutEffect(() => {
    if (isMounted.current) {
      if (isOk && modalOnOkSelectedId) {
        if (isDelete) {
          deleteWorkout(modalOnOkSelectedId);
          setIsDelete(false);
        } else if (isEdit) {
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
      title="Do you even lift?   Try making a workout!"
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
            icon="plus-square"
            color={theme.colors.primary}
            style={{
              paddingRight: 20,
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
        marginTop: 5,
        marginBottom: 5,
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
      onPress={handleOnSubmit}
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
