import React from 'react';
import { withTheme, List } from 'react-native-paper';
import { View, Animated, Easing } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { StateContext } from '../../../../controllers/state';
import CardWithButton from '../../../../template/CardWithButton';
import ScrollList from '../../../../template/ScrollList';
import WorkoutItem from './WorkoutItem';
import WorkoutAPI from '../../../../controllers/WorkoutApi';

// const Data = [];
const Workouts = ({
  theme,
  navigation,
  setMessage,
  setNotifyTitle,
  setShowNotify,
  isOk,
  setIsOk,
}) => {
  const {
    user,
    selectedWorkout: {selectedWorkout,  setSelectedWorkout },
    workouts: { workouts, setWorkouts },
  } = React.useContext(StateContext);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  const [selected, setSelected] = React.useState(null);
  const [isDelete, setIsDelete] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [modalOnOkSelectedId, setModalOnOkSelected] = React.useState('');
  const springAnim = React.useRef(new Animated.Value(1)).current;
  const isMounted = React.useRef(true);
  const springOut = (callback) => {
    Animated.timing(springAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.ease.out,
    }).start(callback);
  };

  const panX = springAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  const setUpdatedWorkout = (id) => {
    if (id) {
      setSelectedWorkout(workouts.find((a) => a.title === id));
    } else {
      setSelectedWorkout();
    }
  };

  const deleteWorkout = React.useCallback(
    (id) => {
      if (id && user && user.uid && isMounted.current) {
        WorkoutAPI.deleteWorkout(user.uid, id);
      }
      springOut(() => {
        if (isMounted.current) {
          setIsOk(false);
          setModalOnOkSelected(null);
          setSelected(null);
        }
        springAnim.setValue(1);
        setWorkouts(() => [...workouts].filter((d) => d.id !== id));
      });
    },
    [user, workouts]
  );

  const editWorkout = React.useCallback(() => {
    setUpdatedWorkout(selected);
    navigation.navigate('Create');
  }, [selected, user, workouts]);

  const handleOnSubmit = React.useCallback(() => {
    setIsLoading(!isDisable);
    setUpdatedWorkout(selected);
    navigation.navigate('Exercises');
  }, [selected, workouts, isDisable]);

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

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      if (isOk && isDelete && modalOnOkSelectedId) {
        deleteWorkout(modalOnOkSelectedId);
      } else if (isOk && isEdit && modalOnOkSelectedId) {
        editWorkout(modalOnOkSelectedId);
      }
      setIsDelete(false);
      setIsEdit(false);
      setModalOnOkSelected(null);
    }
  }, [isOk]);

  const Item = ({ item }) => (
    <Animated.View
      style={
        item && item.id === selected
          ? { opacity: springAnim, transform: [{ translateX: panX }] }
          : null
      }
    >
      <WorkoutItem
        onPress={() => onPress(item.id)}
        isSelected={item && item.id === selected}
        text={item}
        handleTrash={handleTrash}
        handleEdit={handleEdit}
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
          <FontAwesome5
            name="plus-square"
            style={{
              color: theme.colors.primary,
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
      showButton={workouts && workouts.length > 0}
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
