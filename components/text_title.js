import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TextAndTitle(props) {
  return (
    <View style={styles.parent}>
      <Text style={props.heading_styles}>{props.heading}</Text>
      <Text style={props.text_styles}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    margin: 5,
    paddingEnd: 10,
  },
});
