import React from "react";
import { StyleSheet, Image, View, TextInput } from "react-native";

export default function CountryInput(props) {
  return (
    <View style={styles.input_view}>
      <TextInput style={{ width: "95%" }} placeholder={props.placeholder} />
      <Image style={styles.drop_down} source={require("../assets/drop.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  input_view: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  drop_down: {
    marginBottom: 8,
    alignSelf: "flex-end",
  },
});
