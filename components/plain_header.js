import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default function PlainHeader(props) {
  return (
    <View style={styles.back_logo}>
      <TouchableOpacity onPress={props.nav}>
      <Image source={require("../assets/back.png")} />
      </TouchableOpacity>
      <Text style={styles.title_text}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  back_logo: {
    marginHorizontal: 20,
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  title_text: {
    marginStart: "25%",
    fontWeight: "bold",
    fontSize: 20,
  },
});
