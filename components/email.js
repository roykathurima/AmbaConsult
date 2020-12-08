import React from "react";
import { StyleSheet, Image, View, TextInput } from "react-native";

export default function EmailField(props) {
  return (
    <View style={styles.input_view}>
      <Image
        style={{ marginTop: 7, marginStart: 5, marginEnd: 8 }}
        source={require("../assets/email.png")}
      />
      <TextInput onChangeText={props.onHandleTextChange} style={{ width: "100%" }} placeholder="Email" />
    </View>
  );
}

const styles = StyleSheet.create({
  input_view: {
    flexDirection: "row",
    // justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
});
