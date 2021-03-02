import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { withTheme, Switch, List, RadioButton, Button, Text } from 'react-native-paper';
import { StateContext } from '../../../controllers/state';
import CardWithButton from '../../../template/CardWithButton';
import ButtonTemplate from '../../../template/ButtonTemplate';
import LegalPrivacyPolicy from '../../NoAuth/Legal/LegalPrivacy';
import DeleteAccount from './parts/DeleteAccount';

const SettingsScreen = ({ navigation, theme }) => {
  const { userDetails, setUserDetails } = React.useContext(StateContext);
  const [showLegal, setShowLegal] = React.useState(false);
  // Settings for app, excluding reset/change password, email, delete account
  // have privacy policy in here
  // have theme picker, gender change on splash, timeout on login, share workouts, contact email
  const styles = StyleSheet.create({
    linkButton: {
      marginTop: 20,
      marginBottom: 10,
      fontSize: 16,
      marginLeft: 5,
    },
    linkText: {
      color: theme.colors.link,
      textTransform: 'Capitalize',
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
  const [showDelete, setShowDelete] = React.useState(false);

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

  const setShowContact = () =>
    Linking.openURL('mailto:help@loblollysoftware.com?subject=RepsApp Help');

  // Settings for app, excluding reset/change password, email, delete account
  // have privacy policy in here
  // have theme picker, gender change on splash, timeout on login, share workouts, contact email
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
          <List.Section>
            <List.Item
              title="Dark Mode"
              right={() => (
                <Switch value={themeToggle} onValueChange={onToggleTheme} theme={theme} />
              )}
            />
            <List.Item title="Splash Display" right={splashSelect} />
          </List.Section>
          <List.Section>
            <List.Subheader> Account Settings </List.Subheader>
            <List.Item title="Change Email" />
            <List.Item title="Reset Password" />
            <List.Item title="Logout" />
          </List.Section>
          <List.Section>
            <List.Item
              title="Delete Account (forever)"
              onPress={() => setShowDelete(true)}
              right={() => (
                <Button
                  style={[styles.linkButton]}
                  labelStyle={[styles.linkText, { color: theme.colors.alert }]}
                  onPress={() => setShowDelete(true)}
                >
                  Remove it
                </Button>
              )}
            />
          </List.Section>
          <List.Section>
            <List.Item
              title="Contact Us"
              onPress={setShowContact}
              right={() => (
                <Button
                  style={[styles.linkButton]}
                  labelStyle={[styles.linkText]}
                  onPress={setShowContact}
                >
                  Do it
                </Button>
              )}
            />
            <List.Item
              title="Legal & Privacy Policy"
              onPress={() => setShowLegal(true)}
              right={() => (
                <Button
                  style={[styles.linkButton]}
                  labelStyle={[styles.linkText]}
                  onPress={() => setShowLegal(true)}
                >
                  View
                </Button>
              )}
            />
          </List.Section>
        </View>
      </CardWithButton>
      <LegalPrivacyPolicy
        navigation={navigation}
        theme={theme}
        isVisible={showLegal}
        setIsVisible={setShowLegal}
      />
      <DeleteAccount
        isVisible={showDelete}
        setIsVisible={setShowDelete}
        theme={theme}
        navigation={navigation}
        confirmString="remove"
      />
    </>
  );
};

export default withTheme(SettingsScreen);
