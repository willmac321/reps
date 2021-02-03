import React from 'react';
import { withTheme, List } from 'react-native-paper';
import { View, Animated, Easing } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CardWithButton from '../../../../template/CardWithButton';
import ScrollList from '../../../../template/ScrollList';
import WorkoutItem from './WorkoutItem';

// const Data = [];
const Workouts = ({
  theme,
  user,
  navigation,
  setMessage,
  setNotifyTitle,
  setShowNotify,
  isOk,
  setIsOk,
  data,
  setData,
  setSelectedWorkout,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [modalOnOkSelectedId, setModalOnOkSelected] = React.useState('');
  const springAnim = React.useRef(new Animated.Value(1)).current;

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

  const deleteWorkout = (id) => {
    springOut(() => {
      setIsOk(false);
      setModalOnOkSelected(null);
      springAnim.setValue(1);
      setData(data.filter((d) => d.id !== id));
      setSelected(null);
    });
    // TODO API call
  };

  const handleOnSubmit = () => {
    setIsLoading(!isDisable);
    setSelectedWorkout(selected);
    // TODO navigate to workout screen
  };

  const onPress = (id) => {
    setSelected(id);
  };

  const handleEdit = (_, id) => {
    setSelected(id);
  };

  const handleTrash = (_, id) => {
    setSelected(id);
    setNotifyTitle('Woah, you sure...');
    setMessage(`Do you really want to delete ${data.filter((d) => d.id === id)[0].title}?`);
    setIsOk(false);
    setModalOnOkSelected(id);
    setShowNotify(true);
  };

  const handleNew = () => {
    navigation.navigate('Create');
  };

  //  React.useEffect(() => {
  //    if (springAnim === 1) {
  //    }
  //  }, [springAnim]);

  React.useEffect(() => {
    if (isOk && modalOnOkSelectedId) {
      deleteWorkout(modalOnOkSelectedId);
    }
    setModalOnOkSelected(null);
  }, [isOk]);

  const Item = ({ item }) => (
    <Animated.View
      style={
        item.id === selected ? { opacity: springAnim, transform: [{ translateX: panX }] } : null
      }
    >
      <WorkoutItem
        onPress={() => onPress(item.id)}
        isSelected={item.id === selected}
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
      showButton={data.length > 0}
      theme={theme}
      buttonDisabled={isDisable}
      onPress={handleOnSubmit}
      isLoading={isLoading}
      flex={1}
      style={{
        flex: data.length > 0 ? 1 : null,
        marginBottom: 50,
      }}
    >
      <ScrollList
        data={data}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        extraData={selected}
        theme={theme}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={EmptyComponent}
      />
    </CardWithButton>
  );
};

export default withTheme(Workouts);
