import React, { useContext } from 'react';
import { withTheme, List, Portal } from 'react-native-paper';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Text, View, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import State from '../controllers/state';
import CardWithButton from '../template/CardWithButton';
import ScrollList from '../template/ScrollList';
import DraggableScrollList from '../template/DraggableScrollList';
import { useIsMounted } from '../utils/useIsMounted';
import ExerciseItem from './ExerciseItem';
import ExerciseItemDraggable from './ExerciseItemDraggable';

const Exercises = ({
  setIsLoading,
  exercises,
  selected,
  setSelected,
  theme,
  isDraggable = false,
  showTrash = false,
  handleNew = null,
  handleTrash = () => {},
  setShowCompletion = () => {},
  OnPressExerciseComponent = null,
  setSelectedExercise = () => {},
  panX = null,
  showAnimation = true,
  setIsReload = () => {},
}) => {
  const {
    exercises: { updateExerciseOrder },
  } = useContext(State);
  const [localExercises, setLocalExercises] = React.useState([]);
  const isMounted = useIsMounted();
  const [scrollToIndex, setScrollToIndex] = React.useState(null);

  React.useEffect(() => {
    if (isMounted.current) {
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

  const handleNewDragOrder = React.useCallback(
    (event) => {
      setIsReload(false);
      const { data } = event;
      updateExerciseOrder(data, false);
      setLocalExercises(data);
    },
    [localExercises]
  );

  const onHandleProgress = React.useCallback(() => {
    if (isMounted.current && selected) {
      const index = localExercises.findIndex((a) => a.id === selected);
      if (index > -1 && localExercises.length > index + 1) {
        setSelected(localExercises[index + 1].id);
        setScrollToIndex(index + 1);
      } else if (localExercises.length === index + 1) {
        setSelected(null);
        setShowCompletion(true);
      }
    }
  }, [selected, localExercises, isMounted]);

  const Item = ({ item, isActive }) => (
    <Animated.View
      style={item && panX && item.id === selected ? { transform: [{ translateX: panX }] } : null}
    >
      <ExerciseItem
        onPress={() => handleSetSelected(item.id)}
        disabled={isActive}
        isSelected={item.id === selected}
        text={item}
        OnPressComponent={OnPressExerciseComponent}
        handleProgress={onHandleProgress}
        totalExercises={localExercises.length}
        showTrash={showTrash}
        handleTrash={() => handleTrash(item.id)}
        showAnimation={showAnimation}
      />
    </Animated.View>
  );

  const DraggableItem = ({ item, drag, isActive }) => (
    <ScaleDecorator>
      <ExerciseItemDraggable
        onPress={() => handleSetSelected(item.id)}
        onLongPress={(event) => {
          drag(event);
        }}
        disabled={isActive}
        isSelected={item.id === selected}
        text={item}
        OnPressComponent={OnPressExerciseComponent}
        handleProgress={onHandleProgress}
        totalExercises={localExercises.length}
        showTrash={showTrash}
        handleTrash={() => handleTrash(item.id)}
        showAnimation={showAnimation}
      />
    </ScaleDecorator>
  );

  const EmptyComponent = () => (
    <List.Item
      title={<Text>Jenkies, add an exercise!</Text>}
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
    <Portal.Host>
      <CardWithButton
        theme={theme}
        showButton={false}
        flex={1}
        style={{
          flexGrow: localExercises.length > 0 ? 1 : null,
          marginBottom: 50,
          scrollbarColor: `${theme.colors.primary} ${theme.colors.surface}`,
        }}
      >
        {isDraggable ? (
          <DraggableScrollList
            data={localExercises}
            renderItem={DraggableItem}
            onDragEnd={handleNewDragOrder}
            keyExtractor={(item) => item.id}
            extraData={selected}
            theme={theme}
            ItemSeparatorComponent={ItemSeparator}
            ListEmptyComponent={EmptyComponent}
          />
        ) : (
          <ScrollList
            data={localExercises}
            renderItem={Item}
            onDragEnd={() => {}}
            keyExtractor={(item) => item.id}
            extraData={selected}
            theme={theme}
            ItemSeparatorComponent={ItemSeparator}
            ListEmptyComponent={EmptyComponent}
            scrollToIndex={scrollToIndex}
          />
        )}
      </CardWithButton>
    </Portal.Host>
  );
};

export default withTheme(Exercises);
