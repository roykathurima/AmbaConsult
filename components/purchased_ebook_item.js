import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import TextAndTitle from "./text_title";

export default function PurchasedEBookItem(props) {
  return (
    <View style={{ ...styles.item_view, ...props.style }}>
      <TextAndTitle
        heading="Book Title:"
        text={`\t ${props.book_title}`}
        heading_styles={styles.heading_text}
        text_styles={styles.text}
      />
      <TextAndTitle
        heading="Author:"
        text={`\t\t\t ${props.author}`}
        heading_styles={styles.heading_text}
        text_styles={styles.text}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: 10,
          marginTop: 20,
        }}
      >
        <Image source={require("../assets/pdf_logo.png")} />
        <TouchableOpacity style={styles.button} onPress={props.onHandlePress} >
          <Text style={styles.btn_text}>Download PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item_view: {
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    paddingVertical: 20,
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
    backgroundColor: "#8DBA76",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    paddingVertical: 10,
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
