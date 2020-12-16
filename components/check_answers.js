import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default function CheckAnswer(props) {
  // const [checked, setChecked] = useState(false);
  // const toggleChecked = () => {
  //   checked ? setChecked(false) : setChecked(true);
  // };
  return (
    <View style={styles.input_view}>
      <TouchableOpacity onPress={props.toggleChecked}>
        {props.checked ? (
          <Image source={require("../assets/checkbox_enabled.png")} />
        ) : (
          <Image source={require("../assets/checkbox_disabled.png")} />
        )}
      </TouchableOpacity>
      <Text style={styles.choice}>{props.choice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input_view: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginHorizontal: 25,
    alignItems: "center",
  },
  choice: {
    flexWrap: "wrap",
    fontSize: 15,
    marginStart: 10,
  },
});
