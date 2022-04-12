import React from 'react';
import { withTheme } from 'react-native-paper';
import { View } from 'react-native';
import CardWithButton from '../../../../template/CardWithButton';

const NewExerciseNext = ({ navigation, theme }) => {
  const handleOnPress = React.useCallback(() => {
    navigation.navigate('Exercises');
  }, [navigation]);
  return (
    <View theme={theme}>
      <CardWithButton title="" buttonText="Done" showButton onPress={handleOnPress} theme={theme} />
    </View>
  );
};

export default withTheme(NewExerciseNext);
