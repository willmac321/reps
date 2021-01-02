import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'react-native-paper';
import CardWithButton from '../../../template/CardWithButton';

const Register = ({ theme, navigation }) => {
  return (
    <View theme={theme}>
      <CardWithButton
        title="New User?"
        buttonText="Register"
        theme={theme}
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default withTheme(Register);
