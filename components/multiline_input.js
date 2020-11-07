import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function MultiLineInput(props) {
  return (
    <View style={{ ...styles.input_view, ...props.text_input_styles }}>
      <TextInput
        style={{
          width: "100%",
          textAlignVertical: "top",
        }}
        multiline={true}
        numberOfLines={8}
        placeholder={props.placeholder}
        onChangeText={props.onHandleTextChange}
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
});
