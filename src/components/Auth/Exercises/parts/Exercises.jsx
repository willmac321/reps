import React from 'react';
import { withTheme, List, Portal } from 'react-native-paper';
import { View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import NotifyModal from '../../../../template/NotifyModal';
import { StateContext } from '../../../../controllers/state';
import CardWithButton from '../../../../template/CardWithButton';
import ScrollList from '../../../../template/ScrollList';
import LoadingOverlay from '../../../../template/LoadingOverlay';
import ExerciseItem from './ExerciseItem';

const Exercises = ({
  isLoading,
  navigation,
  theme,
  setShowNotify,
  isOk,
  setIsOk,
  showEditAndSelect,
  OnPressExerciseComponent = null,
  setSelectedExercise = () => {},
}) => {
  const {
    exercises: { exercises },
  } = React.useContext(StateContext);

  const [selected, setSelected] = React.useState(null);
  const [showCompletion, setShowCompletion] = React.useState(false);

  const onPress = React.useCallback(
    (id) => {
      if (id === selected) {
        setSelected(null);
        setSelectedExercise(null);
      } else {
        setSelected(id);
        if (exercises) {
          const index = exercises.findIndex((e) => e.id === id);
          setSelectedExercise(index > -1 ? exercises[index] : null);
        }
      }
    },
    [selected, exercises]
  );

  const onHandleProgress = React.useCallback(() => {
    if (selected) {
      const index = exercises.findIndex((a) => a.id === selected);
      if (index > -1 && exercises.length > index + 1) {
        setSelected(exercises[index + 1].id);
      } else if (exercises.length === index + 1) {
        setSelected(null);
        setShowCompletion(true);
      }
    }
  }, [selected, exercises]);

  const handleNew = () => {
    navigation.navigate('Create', { screen: 'NewExercises' });
  };

  // // TODO remove
  // React.useLayoutEffect(() => {
  //   handleNew();
  // }, []);

  const Item = ({ item }) => (
    <View>
      <ExerciseItem
        onPress={() => onPress(item.id)}
        isSelected={item.id === selected}
        text={item}
        OnPressComponent={OnPressExerciseComponent}
        handleProgress={onHandleProgress}
        totalExercises={exercises.length}
      />
    </View>
  );

  const EmptyComponent = () => (
    <List.Item
      title="Jenkies, add an exercise!"
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
    <>
      <Portal.Host>
        <CardWithButton
          theme={theme}
          showButton={false}
          flex={1}
          style={{
            flex: exercises.length > 0 ? 1 : null,
            marginBottom: 50,
          }}
        >
          <ScrollList
            data={exercises}
            renderItem={Item}
            keyExtractor={(item) => item.id}
            extraData={selected}
            theme={theme}
            ItemSeparatorComponent={ItemSeparator}
            ListEmptyComponent={EmptyComponent}
          />
          <LoadingOverlay theme={theme} isVisible={isLoading} />
        </CardWithButton>
      </Portal.Host>
      <NotifyModal
        title="🐎🐎🐎 Yesssss  🐎🐎🐎"
        buttonText="👍"
        theme={theme}
        content="Nice work out!  Cool it down now."
        isVisible={showCompletion}
        setIsVisible={setShowCompletion}
        style={{
          width: 'unset',
          margin: 'auto',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      />
    </>
  );
};

export default withTheme(Exercises);
