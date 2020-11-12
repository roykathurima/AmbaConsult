import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function AmbaInput(props) {
  return (
    <View style={styles.input_view}>
      <TextInput value={props.value} editable={props.editable} onChangeText={props.onHandleTextChange} secureTextEntry={props.secure} style={{ width: "100%" }} placeholder={props.placeholder} />
      {/* <TextInput onEndEditing={props.end_edit} secureTextEntry={props.secure} style={{ width: "100%" }} placeholder={props.placeholder} /> */}
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
});
