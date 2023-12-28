import React from "react";
import { View, StyleSheet } from "react-native";
import { Subheading, Text, Title, withTheme } from "react-native-paper";
import CardWithButton from "../../template/CardWithButton";
import { Link } from "@react-navigation/native";
const DeleteMe = ({ theme }) => {
  const styles = StyleSheet.create({
    list: { marginLeft: 8, padding: 2 },
    item: { marginLeft: 8, marginVertical: 2 },
    link: {
      color: theme.colors.link,
    },
  });

  return (
    <View>
      <CardWithButton buttonDisabled title={"Account Deletion"}>
        <Title>Reps App</Title>
        <Title>Two Options to Delete Your Data</Title>
          <Text style={styles.item}>
            All data will be removed associated with a valid email.  There is no additional retention period and the request is permanent.
            </Text>
        <View style={styles.list}>
          <Subheading variant="titleLarge">Login to the app (Preferred) - Instant</Subheading>
          <Text style={styles.item}>
            1) Navigate to{" "}
            <Link style={styles.link} to={"/noauth/login"}>
              Login Screen
            </Link>
          </Text>
          <Text style={styles.item}>2) Login to the application</Text>
          <Text style={styles.item}>
            3) Select the settings tab, the cog, on the bottom of the screen. Or
            navigate to{" "}
            <Link style={styles.link} to={"/auth/settings"}>
              Settings
            </Link>{" "}
            after logging in.
          </Text>
          <Text style={styles.item}>
            4) Select 'Remove It' next to the Delete Account (forever) label and
            follow the steps to verify your account.
          </Text>
          <Text style={styles.item}>
            5) All data associated with the account and password used will be removed instantaneously.
          </Text>
        </View>
        <View style={styles.list}>
          <Subheading variant="titleLarge">Email the author - Up to 2 Weeks</Subheading>
          <Text style={styles.item}>
            1) Email {" "}
            <Link style={styles.link} to={
    "mailto:will@loblollysoftware.com?subject=RepsApp Delete Account" }>
              will@loblollysoftware.com
            </Link>
          </Text>
          <Text style={styles.item}>2) Include the email used to create the account.  If no email is supplied, no action will be taken!</Text>
          <Text style={styles.item}>3) If an account exists, it will be removed in up to 2 weeks.</Text>
        </View>
      </CardWithButton>
    </View>
  );
};

export default withTheme(DeleteMe);
