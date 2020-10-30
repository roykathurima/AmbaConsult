import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import TextAndTitle from "./text_title";

export default function EBookItem(props) {
  return (
    <View style={styles.item_view}>
      <TextAndTitle
        heading="Book Title:"
        text={props.book_title}
        heading_styles={styles.heading_text}
        text_styles={styles.text}
      />
      <TextAndTitle
        heading="Author:"
        text={props.author}
        heading_styles={styles.heading_text}
        text_styles={styles.text}
      />
      <TextAndTitle
        heading="Price:"
        text={props.price}
        heading_styles={styles.heading_text}
        text_styles={styles.price_text}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.btn_text}>Purchase</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item_view: {
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
  heading_text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    marginStart: 5,
  },
  price_text: {
    color: "#8DBA76",
    marginStart: 5,
    fontWeight: "bold",
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: "#8DBA76",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginEnd: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  btn_text: {
    color: "#fff",
    marginHorizontal: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
});
