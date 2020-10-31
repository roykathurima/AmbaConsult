import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";

export default function AccountHeadBanner(props) {
  return (
    <View style={styles.back_logo}>
      <Image source={require("../assets/white_back.png")} />
      <Text style={styles.account}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  back_logo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8DBA76",
    paddingHorizontal: 20,
    paddingTop: "18%",
    paddingBottom: 40,
    borderBottomRightRadius: 60,
  },
  account: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginStart: "28%",
  },
});
