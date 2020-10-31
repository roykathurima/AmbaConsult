import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import AmbaInput from "../components/amba_input";
import CountryInput from "../components/country";
import GreenButton from "../components/button";

export default function AccountProfile() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.edit_icon}
        source={require("../assets/edit_icon.png")}
      />
      <Image
        style={{ resizeMode: "cover", ...styles.dp }}
        source={require("../assets/course_image.png")}
      />
      <View style={{ marginHorizontal: 10 }}>
        <AmbaInput placeholder="Mark" />
        <AmbaInput placeholder="Anthony" />
        <AmbaInput placeholder="markanthony2020@gmail.com" />
        <CountryInput placeholder="United Kingdom" />
        <GreenButton text="Save" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  edit_icon: { marginTop: 30, alignSelf: "flex-end", marginEnd: 30 },
  dp: {
    height: 100,
    width: 100,
    borderRadius: 80,
    alignSelf: "center",
    marginVertical: 10,
  },
});
