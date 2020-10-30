import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, Image, View, TextInput } from "react-native";
import LogoText from "../components/logo_text";
import EmailField from "../components/email";
import PasswordField from "../components/password";
import GreenButton from "../components/button";

export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.back_logo}>
        <Image source={require("../assets/back.png")} />
        <View style={styles.logo}>
          <Image source={require("../assets/logo.png")} />
          <LogoText />
        </View>
        <Text style={styles.please_login}>Please Login</Text>

        <EmailField />
        <PasswordField placeholder="Password" />
        <Text
          style={{ alignSelf: "flex-end", marginTop: 10, color: "#5C738B" }}
        >
          Forgot Password?
        </Text>
        <GreenButton text="Login" />
        <View style={styles.register_view}>
          <Text style={{ alignSelf: "center", color: "#000" }}>New User? </Text>
          <Text style={{ alignSelf: "center", color: "#5C738B" }}>
            Register
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingTop: 30,
  },
  back_logo: {
    margin: 20,
  },
  logo: {
    alignSelf: "center",
    marginTop: "2%",
  },
  register_view: {
    flexDirection: "row",
    marginTop: 200,
    justifyContent: "center",
  },
  please_login: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#547C36",
    marginTop: 40,
  },
});
