import React from 'react';
import { withTheme, List, Portal } from 'react-native-paper';
import { View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
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
}) => {
  const {
    exercises: { exercises },
  } = React.useContext(StateContext);
  const [selected, setSelected] = React.useState(null);

  const onPress = (id) => {
    setSelected(id);
  };

  const handleNew = () => {};

  const Item = ({ item }) => (
    <View>
      <ExerciseItem
        onPress={() => onPress(item.id)}
        isSelected={item.id === selected}
        text={item}
      />
    </View>
  );

  const EmptyComponent = () => (
    <List.Item
      title="Like, Scoob..., try adding a workout!"
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
  );
};

export default withTheme(Exercises);
