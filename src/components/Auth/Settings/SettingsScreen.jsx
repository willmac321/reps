import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Switch, List, RadioButton, Text } from 'react-native-paper';
import { StateContext } from '../../../controllers/state';
import CardWithButton from '../../../template/CardWithButton';
import { PrivacyPolicy } from './parts/Privacy';

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
    radio: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    radioContainer: {
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
  });

  const [themeToggle, setThemeToggle] = React.useState(userDetails.theme === 'light');
  const [splashToggle, setSplashToggle] = React.useState(userDetails.splashScreenIcon);

  console.log(userDetails.splashScreenIcon);

  const onToggleTheme = () => {
    setUserDetails({
      ...userDetails,
      theme: !themeToggle ? 'light' : 'dark',
    });
    setThemeToggle(!themeToggle);
  };

  const onSplashToggle = (newVal) => {
    setSplashToggle(newVal);
    setUserDetails({
      ...userDetails,
      splashScreenIcon: newVal,
    });
  };

  const splashSelect = () => (
    <RadioButton.Group onValueChange={(newVal) => onSplashToggle(newVal)} value={splashToggle}>
      <View style={styles.radioContainer}>
        <View style={styles.radio}>
          <Text>Adonis</Text>
          <RadioButton value="adonis" />
        </View>
        <View style={styles.radio}>
          <Text>Aphrodite</Text>
          <RadioButton value="aphrodite" />
        </View>
      </View>
    </RadioButton.Group>
  );

  return (
    <>
      <CardWithButton
        theme={theme}
        showButton={false}
        flex={1}
        style={{
          marginBottom: 50,
        }}
      >
        <View>
          <List.Item
            title="Dark Mode"
            right={() => <Switch value={themeToggle} onValueChange={onToggleTheme} theme={theme} />}
          />
          <List.Item title="Splash Display" right={splashSelect} />
        </View>
      </CardWithButton>
      <PrivacyPolicy navigation={navigation} theme={theme} />
    </>
  );
};

export default withTheme(SettingsScreen);
