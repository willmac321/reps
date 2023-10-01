import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'react-native-paper';
import CardWithButton from '../../../../template/CardWithButton';

const Register = ({ theme, navigation }) => {
  const onRegisterClick = () => {
    navigation.navigate('Register');
  };
  return (
    <View theme={theme}>
      <CardWithButton
        title="New User?"
        buttonText="Register"
        theme={theme}
        showButton
        onPress={() => onRegisterClick()}
      />
    </View>
  );
};

export default withTheme(Register);
