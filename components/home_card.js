import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

export default function HomeCard(props) {
  return (
    <TouchableOpacity style={styles.card_view} onPress={props.onHandlePress}>
      <Text style={styles.card_text}>{props.text}</Text>
      <Image source={props.img_url} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card_view: {
    width: 150,
    height: 180,
    backgroundColor: "#fff",
    borderRadius: 30,
    margin: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  card_text: {
    color: "#33373E",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 13,
  },
});
