import React from "react";
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  ImagePropTypes,
} from "react-native";

export default function SearchInput(props) {
  return (
    <View style={styles.input_view}>
      <Image
        style={{ marginTop: 7, marginStart: 10, marginEnd: 8 }}
        source={require("../assets/search_icon.png")}
      />
      <TextInput style={{ width: "100%" }} placeholder={props.placeholder} onChangeText={props.onTextChanged} onSubmitEditing={props.onSubmit}/>
    </View>
  );
}

const styles = StyleSheet.create({
  input_view: {
    flexDirection: "row",
    // justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#F3F3F3",
    padding: 10,
    borderRadius: 30,
    marginTop: 15,
  },
});
