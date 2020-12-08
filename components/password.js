import React, {useState} from "react";
import { StyleSheet, Image, View, TextInput, TouchableOpacity } from "react-native";

export default function PasswordField(props) {
  const [secureValue, setSecureValue] = useState(true);
  const onEyePressed = ()=>{
    secureValue?setSecureValue(false):setSecureValue(true);
  }
  return (
    <View style={styles.input_view}>
      <Image
        style={{ marginTop: 2, marginStart: 3, marginEnd: 7 }}
        source={require("../assets/padlock.png")}
      />
      <TextInput onChangeText={props.onHandleTextChange} secureTextEntry={secureValue} style={{ width: "80%" }} placeholder={props.placeholder} />
      <TouchableOpacity onPress={onEyePressed}>
      <Image
        style={styles.password_eye}
        source={require("../assets/macho.png")}
      />
      </TouchableOpacity>
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
