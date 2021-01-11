import React from 'react';
import { withTheme, List } from 'react-native-paper';
import { FlatList } from 'react-native';
import CardWithButton from '../../../../template/CardWithButton';
import WorkoutItem from './WorkoutItem';

const Data = [];
//[...Array(10).keys()].map((k) => ({
//  id: k,
//  title: `workout ${k}`,
//  date: Date.now().toLocaleString(),
//}));

const Workouts = ({ theme }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const handleOnSubmit = () => {
    setIsLoading(!isDisable);
  };
  const onPress = (id) => setSelected(id);

  const Item = ({ item }) => (
    <WorkoutItem onPress={() => onPress(item.id)} isSelected={item.id === selected} text={item} />
  );

  return (
    <CardWithButton
      buttonText="Select"
      theme={theme}
      buttonDisabled={isDisable}
      onPress={handleOnSubmit}
      isLoading={isLoading}
    >
      <FlatList
        data={Data}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        extraData={selected}
        ListEmptyComponent={<List.Item title="Do you even lift?   Try making a workout!" theme={theme} style={[theme.buttonText, {color:theme.colors.primary}]}/>}
      />
    </CardWithButton>
  );
};

export default withTheme(Workouts);
