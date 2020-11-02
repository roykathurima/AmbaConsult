import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import LogoText from "../components/logo_text";
import GreenButton from "../components/button";
import AmbaInput from "../components/amba_input";
import CountryInput from "../components/country";
import PhoneInput from "../components/phone_input";

export default function CreateAccount() {
  const country_api_url = "https://restcountries.eu/rest/v2/all"
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.back_logo}>
          <Image source={require("../assets/back.png")} />
          <View style={styles.logo}>
            <Image source={require("../assets/logo.png")} />
            <LogoText />
          </View>
          <Text style={styles.create_account}>Create Account</Text>
          <AmbaInput placeholder="First Name" />
          <AmbaInput placeholder="Last Name" />
          <AmbaInput placeholder="Email" />
          <CountryInput placeholder="Select Country" />
          <PhoneInput pretext="+44" posttext="993000000" />
          <AmbaInput placeholder="Password" />
          <AmbaInput placeholder="Confirm Password" />
          <GreenButton text="Create Account" />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  },
  create_account: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#547C36",
    marginTop: 40,
  },
});
