import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

export default function Calendar(props) {
  return (
    <TouchableOpacity style={[styles.button]} onPress={props.onHandlePress}>
      <Text style={styles.btn_text}>{props.text}</Text>
      <Image source={require("../assets/calendar.png")} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    padding: 5,
    marginEnd: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  btn_text: {
    fontSize: 15,
    fontWeight: "bold",
    marginEnd: 5,
  },
});
