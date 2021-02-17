import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Switch } from 'react-native-paper';
import { StateContext } from '../../../controllers/state';
import CardWithButton from '../../../template/CardWithButton';

const SettingsScreen = ({ navigation, theme }) => {
  const { userDetails, setUserDetails } = React.useContext(StateContext);
  // Settings for app, excluding reset/change password, email, delete account
  // have privacy policy in here
  // have theme picker, gender change on splash, timeout on login, share workouts, contact email
  const styles = StyleSheet.create({
    link: {
      marginTop: 20,
      marginBottom: 10,
      fontSize: 16,
      color: theme.colors.link,
      marginLeft: 5,
    },
  });

  const [themeToggle, setThemeToggle] = React.useState(userDetails.theme === 'light');

  const onToggleTheme = () => {
    setThemeToggle(!themeToggle);
    setUserDetails({
      ...userDetails,
      theme: themeToggle ? 'light' : 'dark',
    });
  };

  return (
    <CardWithButton
      theme={theme}
      showButton={false}
      flex={1}
      style={{
        marginBottom: 50,
      }}
    >
      <View>
        <Switch value={themeToggle} onValueChange={onToggleTheme} theme={theme} />
      </View>
    </CardWithButton>
  );
};

export default withTheme(SettingsScreen);
