import React from 'react';
import { withTheme } from 'react-native-paper';
import CardWithButton from '../../../../template/CardWithButton';

const Workouts = ({ theme }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);
  const handleOnPress = () => {};
  return (
    <CardWithButton
      title="Please Login"
      buttonText="Submit"
      theme={theme}
      buttonDisabled={isDisable}
      onPress={handleOnPress}
      isLoading={isLoading}
    />
  );
};

export default withTheme(Workouts);
