import React from "react";
import { StyleSheet, Image, View, TextInput, Text } from "react-native";

export default function PhoneInput(props) {
  return (
    <View style={styles.input_view}>
      <Text style={{ width: "12%", paddingTop:5, color:"grey" }}>{props.pretext}</Text>
      {/* <Image style={styles.drop_down} source={require("../assets/drop.png")} /> */}
      <Image
        style={styles.vertical_bar}
        source={require("../assets/vertical_bar.png")}
      />
      <TextInput style={{ width: "70%" }} placeholder={props.posttext} />
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
    marginBottom: 10,
    alignSelf: "flex-end",
  },
  vertical_bar: {
    marginVertical: 5,
    marginEnd: 10,
  },
});
