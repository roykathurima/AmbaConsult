import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, Image, View, ImageBackground } from "react-native";
import VerificationInput from "../components/verification_input";
import GreenButton from "../components/button";

export default function Verify() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        style={{
          width: 200,
          height: 100,
        }}
        source={require("../assets/verify_ellipse.png")}
      >
        <View style={styles.back_logo}>
          <Image source={require("../assets/back.png")} />
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <Image source={require("../assets/verify.png")} />
        <Text style={styles.verification_text}>Verification</Text>
        <Text style={styles.instructions_text}>
          Enter a 6 Digit Number that We Sent To Your Email
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <VerificationInput />
          <VerificationInput />
          <VerificationInput />
          <VerificationInput />
          <VerificationInput />
          <VerificationInput />
        </View>
        <GreenButton style={{ width: "90%", marginTop: 70 }} text="Verify" />
        <Text style={styles.resend_code}>Re-send Code</Text>
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
  content: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  verification_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#547C36",
    marginTop: 40,
  },
  instructions_text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5C738B",
    marginTop: 30,
  },
  resend_code: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "#8DBA76",
    textDecorationLine: "underline",
  },
});
