import React from 'react';
import { withTheme } from 'react-native-paper';
import CardWithButton from '../../../../template/CardWithButton';

const NewWorkout = ({ navigation, theme }) => (
  <>
    <CardWithButton
      buttonText="Select"
      flex={1}
      style={{
        marginBottom: 50,
      }}
    >
      "test"
    </CardWithButton>
  </>
);
export default withTheme(NewWorkout);
