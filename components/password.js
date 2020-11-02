import React from "react";
import { StyleSheet, Image, View, TextInput } from "react-native";

export default function PasswordField(props) {
  return (
    <View style={styles.input_view}>
      <Image
        style={{ marginTop: 2, marginStart: 3, marginEnd: 7 }}
        source={require("../assets/padlock.png")}
      />
      <TextInput secureTextEntry={true} style={{ width: "100%" }} placeholder={props.placeholder} />
      <Image
        style={styles.password_eye}
        source={require("../assets/macho.png")}
      />
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
  password_eye: {
    marginTop: 2,
    marginStart: 3,
    marginEnd: 7,
    alignSelf: "flex-end",
  },
});
