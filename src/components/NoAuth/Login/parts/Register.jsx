import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'react-native-paper';
import CardWithButton from '../../../../template/CardWithButton';
import {useLinkTo} from '@react-navigation/native';

const Register = ({ theme, navigation }) => {
  const linkTo = useLinkTo();
  const onRegisterClick = () => {
    linkTo('/noauth/register');
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
