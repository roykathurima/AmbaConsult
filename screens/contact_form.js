import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, Image, View, TextInput } from "react-native";
import LogoText from "../components/logo_text";
import AmbaInput from "../components/amba_input";
import GreenButton from "../components/button";
import MultiLineInput from "../components/multiline_input";

export default function ContactForm() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.back_logo}>
        <Image source={require("../assets/back.png")} />
        <View style={styles.logo}>
          <Image source={require("../assets/logo.png")} />
          <LogoText />
        </View>
        <Text style={styles.contact_us}>Contact Us</Text>
        <AmbaInput placeholder="Your First Name" />
        <AmbaInput placeholder="Your Email" />
        <AmbaInput placeholder="Organization" />
        <AmbaInput placeholder="Subject" />
        <MultiLineInput placeholder="Enter Your Message Here..." />
        <GreenButton text="Send Message" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingTop: 20,
  },
  back_logo: {
    margin: 20,
  },
  logo: {
    alignSelf: "center",
    marginTop: "2%",
  },
  contact_us: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#547C36",
    marginTop: 40,
    alignSelf: "center",
  },
});
