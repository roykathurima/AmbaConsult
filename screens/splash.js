import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, ImageBackground, Text, Image, View } from "react-native";
import LogoText from "../components/logo_text";

export default function Splash() {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/splash_background.png")}
    >
      <StatusBar style="auto" />
      <View style={styles.logo}>
        <Image source={require("../assets/logo.png")} />
        <LogoText />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    marginTop: "40%",
  },
});
