import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, TextInput } from 'react-native-paper';
import { Link } from '@react-navigation/native';
import CardWithButton from '../../../template/CardWithButton';

const Login = ({ theme, style }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const styles = StyleSheet.create({
    input: theme.input,
    link: {
      marginTop: 20,
      marginBottom: 10,
      fontSize: 16,
      color: theme.colors.link,
    },
  });

  return (
    <View theme={theme}>
      <CardWithButton
        title="Please Login"
        buttonText="Submit"
        theme={theme}
        style={style}
        onPress={() => setIsLoading(!isLoading)}
        isLoading={isLoading}
      >
        <TextInput
          mode="outlined"
          theme={theme}
          keyboardType="email-address"
          autoCompleteType="email"
          textContentType="emailAddress"
          label="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          theme={theme}
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry
          label="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          style={styles.input}
        />
        <Link style={styles.link} to="/Splash">
          Forgot Password?
        </Link>
      </CardWithButton>
    </View>
  );
};

export default withTheme(Login);
