import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function VerificationInput(props) {
  return (
    <TextInput
      style={{
        borderBottomColor: "#547C36",
        borderBottomWidth: 2,
        width: "10%",
        marginVertical: 30,
        marginHorizontal: 10,
        textAlign: "center",
      }}
      onSubmitEditing={props.submit_edit}
      maxLength={1}
      returnKeyType={"next"}
    />
  );
}
