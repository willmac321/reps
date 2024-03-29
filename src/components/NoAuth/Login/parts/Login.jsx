import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  withTheme,
  TextInput,
  HelperText,
  Text,
} from "react-native-paper";
import { Link, useLinkTo } from "@react-navigation/native";
import CardWithButton from "../../../../template/CardWithButton";
import { useIsMounted } from "../../../../utils/useIsMounted";
import AuthApi from "../../../../controllers/AuthApi";

const Login = ({
  theme,
  style,
  setShowNotify,
  setNotifyMessage,
  setNotifyTitle,
  navigation,
}) => {
  const isMounted = useIsMounted();
  const linkTo = useLinkTo();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);
  const [isResetSent, setIsResetSent] = React.useState(false);

  const styles = StyleSheet.create({
    input: theme.input,
    link: {
      marginTop: 20,
      marginBottom: 10,
      fontSize: 16,
      color: theme.colors.link,
      marginLeft: 5,
    },
    linkButton: {
      fontSize: 16,
      marginHorizontal: 0,
    },
    linkText: {
      color: theme.colors.link,
      textTransform: "capitalize",
      marginHorizontal: 1,
    },
    popUpText: {
      width: "100%",
      alignContent: "center",
      justifyContent: "center",
      marginHorizontal: "auto",
    },
  });

  const emailError = () => isMounted.current && email && !email.includes("@");

  React.useEffect(() => {
    if (isMounted.current) {
      if (!password || !email || emailError()) {
        setIsDisable(true);
      } else {
        setIsDisable(false);
      }
    }
  }, [password, email]);

  const callbackHandlePress = useCallback(
    (err, userDetail) => {
      if (isMounted.current) {
        setIsLoading(false);
        if (err || !userDetail) {
          setNotifyTitle("Uhoh!");
          setNotifyMessage(
            "Password or email was incorrect, please reset your password or register if you're a new user!"
          );
          setShowNotify(true);
          return;
        }
        const user = userDetail.user;
        if (user && !user.emailVerified) {
          setNotifyTitle("But really...");
          setNotifyMessage(
            <View style={[styles.popUpText]}>
              <Text>Please verify your email to continue using REPS. </Text>
              <Button
                style={[styles.linkButton]}
                labelStyle={[styles.linkText]}
                onPress={() => {
                  if (!isResetSent) {
                    setIsResetSent(true);
                    AuthApi.emailVerify(user);
                  }
                }}
              >
                Resend Verification
              </Button>
            </View>
          );
          setShowNotify(true);
        } else if (user && user.emailVerified) {
          linkTo('/auth/workouts');
        }
      }
    },
    [linkTo, isMounted, isResetSent]
  );

  const handleOnPress = async () => {
    setIsResetSent(false);
    setIsLoading(true);
    await AuthApi.login(email, password, callbackHandlePress);
  };

  return (
    <View theme={theme}>
      <CardWithButton
        title="Please Login"
        buttonText="Submit"
        theme={theme}
        style={style}
        buttonDisabled={isDisable}
        onPress={handleOnPress}
        isLoading={isLoading}
        showButton
      >
        <TextInput
          mode="outlined"
          theme={theme}
          keyboardType="email-address"
          autoCompleteType="email"
          textContentType="emailAddress"
          label="Email"
          value={email}
          error={emailError()}
          onChangeText={(val) => setEmail(val)}
          style={styles.input}
        />
        {!!emailError() && (
          <HelperText type="error" visible={emailError()}>
            Email address is invalid!
          </HelperText>
        )}
        <TextInput
          mode="outlined"
          theme={theme}
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={!isPasswordVisible}
          label="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          style={styles.input}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            />
          }
        />
        <Link style={styles.link} to={{ screen: "Forgot" }}>
          Forgot Password?
        </Link>
      </CardWithButton>
    </View>
  );
};

export default withTheme(Login);
