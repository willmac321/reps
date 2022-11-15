import React from 'react';
import { Icon, Text, List, withTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import NotifyModal from '../../../../template/NotifyModal';
import { StateContext } from '../../../../controllers/state';
import ExercisesCommon from '../../../../common/ExercisesCommon';

const ExercisesList = ({
  isLoading,
  navigation,
  theme,
  OnPressExerciseComponent = null,
  setSelectedExercise = () => {},
}) => {
  const {
    exercises: { exercises },
  } = React.useContext(StateContext);

  const [selected, setSelected] = React.useState(null);
  const [showCompletion, setShowCompletion] = React.useState(false);

  const handleNew = () => {
    navigation.navigate('Create', { screen: 'NewExercises' });
  };

  return (
    <>
      <ExercisesCommon
        isLoading={isLoading}
        navigation={navigation}
        exercises={exercises}
        selected={selected}
        setSelected={setSelected}
        setShowCompletion={setShowCompletion}
        theme={theme}
        handleNew={handleNew}
        OnPressExerciseComponent={OnPressExerciseComponent}
        setSelectedExercise={setSelectedExercise}
        isDraggable={false}
      />
      <NotifyModal
        title={
          <Text style={{ marginHorizontal: 16 }}>
            <Text style={{ padding: 4 }}>
              {[...Array(3).keys()].map((v) => (
                <FontAwesome5 key={v} name="horse" style={{ fontSize: 24, marginHorizontal: 4 }} />
              ))}
              {'  '}
            </Text>
            Yesssss
            <Text style={{ padding: 4 }}>
              {'  '}
              {[...Array(3).keys()].map((v) => (
                <FontAwesome5 key={v} name="horse" style={{ fontSize: 24, marginHorizontal: 4 }} />
              ))}
            </Text>
          </Text>
        }
        buttonText={
          <FontAwesome5
            name="thumbs-up"
            color={theme.colors.secondary}
            style={{ color: theme.colors.secondary, fontSize: 24 }}
          />
        }
        theme={theme}
        isVisible={showCompletion}
        setIsVisible={setShowCompletion}
        content={
          <Text style={{ marginTop: 24, marginBottom: 4 }}>Nice workout! Cool it down now.</Text>
        }
        style={{
          minWidth: 320,
          flexGrow: 0,
          flexShrink: 1,
          flexBasis: 210,
          alignItems: 'center',
          alignSelf: 'center',
        }}
      />
    </>
  );
};

export default withTheme(ExercisesList);
