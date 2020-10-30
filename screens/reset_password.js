import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import LogoText from "../components/logo_text";
import PasswordField from "../components/password";
import GreenButton from "../components/button";
import PasswordResetSuccess from "../components/password_reset_success";
export default function ResetPassword() {
  const [modalVisible, setModalVisible] = useState(false);
  const handleSavePasswordClick = () => {
    // alert("what's good...");
    setModalVisible(true);
    // Don't worry about manually closing the modal
    // We gon navigate to another screen anyway
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <PasswordResetSuccess modalVisible={modalVisible} />
      <StatusBar style="auto" />
      <View style={styles.back_logo}>
        <Image source={require("../assets/back.png")} />
        <View style={styles.logo}>
          <Image source={require("../assets/logo.png")} />
          <LogoText />
        </View>
        <Text style={styles.reset_password}>Reset Password</Text>

        <PasswordField placeholder="New Password" />
        <PasswordField placeholder="Confrim Password" />

        <GreenButton
          onHandleClick={handleSavePasswordClick}
          text="Save Password"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingTop: 30,
  },
  back_logo: {
    margin: 20,
  },
  logo: {
    alignSelf: "center",
    marginTop: "2%",
  },

  reset_password: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#547C36",
    marginTop: 40,
    alignSelf: "center",
  },
});