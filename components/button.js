import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function GreenButton(props) {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onHandleClick}
      disabled={props.disabled}
    >
      {props.price_text?<Text style={{...styles.btn_text, color:"#C26937", marginEnd: "2%"}}>{props.price_text}</Text>:null}
      <Text style={styles.btn_text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8DBA76",
    width: "100%",
    padding: 15,
    justifyContent: "center",
    marginTop: 40,
    borderRadius: 5,
    flexDirection: "row"
  },
  btn_text: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
