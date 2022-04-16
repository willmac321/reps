import React from 'react';
import { withTheme, List, Portal } from 'react-native-paper';
import { View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CardWithButton from '../template/CardWithButton';
import ScrollList from '../template/ScrollList';
import LoadingOverlay from '../template/LoadingOverlay';
import { useIsMounted } from '../utils/useIsMounted';
import ExerciseItem from './ExerciseItem';

const Exercises = ({
  isLoading,
  navigation,
  exercises,
  selected,
  setSelected,
  theme,
  setShowNotify,
  isOk,
  setIsOk,
  showEditAndTrash = false,
  handleNew = null,
  setShowCompletion = () => {},
  OnPressExerciseComponent = null,
  setSelectedExercise = () => {},
}) => {
  const [localExercises, setLocalExercises] = React.useState([]);
  const isMounted = useIsMounted();

  React.useEffect(() => {
    if (isMounted.current && localExercises) {
      setLocalExercises(
        exercises.map((v) => {
          const rv = { ...v };
          if (v.sets !== '' && v.sets !== null) {
            rv.sets = parseInt(v.sets, 10);
          }
          return rv;
        })
      );
    }
  }, [exercises, isMounted]);

  const handleSetSelected = React.useCallback(
    (id) => {
      if (isMounted.current) {
        if (id === selected) {
          setSelected(null);
          setSelectedExercise(null);
        } else {
          setSelected(id);
          if (localExercises) {
            const index = localExercises.findIndex((e) => e.id === id);
            setSelectedExercise(index > -1 ? localExercises[index] : null);
          }
        }
      }
    },
    [isMounted, selected, localExercises]
  );

  const onHandleProgress = React.useCallback(() => {
    if (isMounted.current && selected) {
      const index = localExercises.findIndex((a) => a.id === selected);
      if (index > -1 && localExercises.length > index + 1) {
        setSelected(localExercises[index + 1].id);
      } else if (localExercises.length === index + 1) {
        setSelected(null);
        setShowCompletion(true);
      }
    }
  }, [selected, localExercises, isMounted]);

  // // TODO remove was in here for debugging
  // React.useLayoutEffect(() => {
  //   handleNew();
  // }, []);

  const Item = ({ item }) => (
    <View>
      <ExerciseItem
        onPress={() => handleSetSelected(item.id)}
        isSelected={item.id === selected}
        text={item}
        OnPressComponent={OnPressExerciseComponent}
        handleProgress={onHandleProgress}
        totalExercises={localExercises.length}
        showEditAndTrash={showEditAndTrash}
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
      onPress={typeof handleNew === 'function' ? handleNew : () => {}}
      right={() => (
        <>
          {handleNew && (
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
          )}
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
    <Portal.Host>
      <CardWithButton
        theme={theme}
        showButton={false}
        flex={1}
        style={{
          flex: localExercises.length > 0 ? 1 : null,
          marginBottom: 50,
        }}
      >
        <ScrollList
          data={localExercises}
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
  );
};

export default withTheme(Exercises);
