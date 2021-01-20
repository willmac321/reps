import React from 'react';
import { withTheme, List } from 'react-native-paper';
import { FlatList, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CardWithButton from '../../../../template/CardWithButton';
import ScrollList from '../../../../template/ScrollList';
import WorkoutItem from './WorkoutItem';

//const Data = [];
const Data =  [...Array(15).keys()].map((k) => ({
  id: k.toString(),
  title: `workout ${k}`,
  date: Date.now().toLocaleString(),
 }));

const Workouts = ({ theme, navigation }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const handleOnSubmit = () => {
    setIsLoading(!isDisable);
  };

  const onPress = (id) => setSelected(id);

  const handleEdit = (_, id) => {
    console.log(id);
  };
  const handleTrash = (_, id) => {
    console.log(id);
  };

  const handleNew = () => {
    navigation.navigate('Create');
  };

  const Item = ({ item }) => (
    <WorkoutItem
      onPress={() => onPress(item.id)}
      isSelected={item.id === selected}
      text={item}
      handleTrash={handleTrash}
      handleEdit={handleEdit}
    />
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
      showButton={Data.length > 0}
      theme={theme}
      buttonDisabled={isDisable}
      onPress={handleOnSubmit}
      isLoading={isLoading}
      flex={1}
      style={{
        flex: Data.length > 0 ? 1 : null,
        marginBottom: 50,
      }}
    >
      <ScrollList
        data={Data}
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
