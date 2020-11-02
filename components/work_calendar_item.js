import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import TextAndTitle from "./text_title";

export default function WorkshopCalendarItem(props) {
  return (
    <View style={styles.item_view}>
      <TextAndTitle
        heading="Title:"
        text={props.title}
        heading_styles={styles.heading_text}
        text_styles={styles.text}
      />
      <TextAndTitle
        heading="Date:"
        text={props.date}
        heading_styles={styles.heading_text}
        text_styles={styles.text}
      />
      <TextAndTitle
        heading="Venue:"
        text={props.venue}
        heading_styles={styles.heading_text}
        text_styles={styles.price_text}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={props.onHandleVDPress} style={styles.button}>
          <Text style={styles.btn_text}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onHandleBookPress} style={styles.button}>
          <Text style={styles.btn_text}>Book</Text>
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
