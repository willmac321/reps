import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'react-native-paper';
import { StateContext } from '../../../controllers/state';
import CardWithButton from '../../../template/CardWithButton';

const Register = ({ theme, navigation }) => {
  const onRegisterClick = (otherStuff) => {
    otherStuff();
  //  navigation.navigate('Splash');
    navigation.navigate('Register');
  };
  return (
    <View theme={theme}>
      <StateContext.Consumer>
        {({ setIsLoading }) => (
          <CardWithButton
            title="New User?"
            buttonText="Register"
            theme={theme}
            onPress={() => onRegisterClick(setIsLoading)}
          />
        )}
      </StateContext.Consumer>
    </View>
  );
};

export default withTheme(Register);
