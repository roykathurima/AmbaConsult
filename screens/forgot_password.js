import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import LogoText from "../components/logo_text";
import EmailField from "../components/email";
import GreenButton from "../components/button";

export default class ForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state= {}
  }
  onLoginPressed = () =>{
    this.props.navigation.navigate("login");
  }
  onStartVerificationPressed = ()=>{
    this.props.navigation.navigate("verify")
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.back_logo}>
          <Image source={require("../assets/back.png")} />
          <View style={styles.logo}>
            <Image source={require("../assets/logo.png")} />
            <LogoText />
          </View>
          <Text style={styles.forgot_password}>Forgot Password</Text>
          <Text style={styles.long_text}>
            Please Enter Your Email. To Ensure Security of your account, OTP code
            will be sent to your Email
          </Text>
          <EmailField />
          <GreenButton text="Start Verification" onHandleClick={this.onStartVerificationPressed}/>
          <View style={styles.register_view}>
            <Text style={{ alignSelf: "center", color: "#000" }}>
              Already Have an Account?
            </Text>
            <TouchableOpacity onPress={this.onLoginPressed}>
            <Text style={{ alignSelf: "center", color: "#5C738B" }}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
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
  register_view: {
    flexDirection: "row",
    marginTop: 200,
    justifyContent: "center",
  },
  forgot_password: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#547C36",
    marginVertical: 30,
    alignSelf: "center",
  },
  long_text: {
    color: "#5C738B",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 20,
  },
});
