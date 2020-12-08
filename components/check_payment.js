import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default function CheckPayment(props) {
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => {
    checked ? setChecked(false) : setChecked(true);
  };
  return (
    <View style={styles.input_view}>
      <TouchableOpacity onPress={toggleChecked}>
        {checked ? (
          <Image source={require("../assets/radio_selected.png")} />
        ) : (
          <Image source={require("../assets/radio_unselected.png")} />
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
    marginHorizontal: 10,
    alignItems: "center",
  },
  choice: {
    flexWrap: "wrap",
    fontSize: 15,
    marginStart: 10,
  },
});
