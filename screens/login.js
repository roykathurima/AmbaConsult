import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import LogoText from "../components/logo_text";
import EmailField from "../components/email";
import PasswordField from "../components/password";
import GreenButton from "../components/button";

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state= {}
  }
  onLoginPressed=()=>{
    this.props.navigation.navigate("home");
  }

  onForgotPasswordPressed = ()=>{
    this.props.navigation.navigate("forgot_password")
  }
  onRegisterPressed = () =>{
    this.props.navigation.navigate("register")
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
          <Text style={styles.please_login}>Please Login</Text>
  
          <EmailField />
          <PasswordField placeholder="Password" />
          <TouchableOpacity onPress={this.onForgotPasswordPressed} style={{paddingVertical: 10, paddingStart: 10}}>
          <Text
            style={{ alignSelf: "flex-end", color: "#5C738B" }}
            >
            Forgot Password?
          </Text>
            </TouchableOpacity>
          <GreenButton text="Login" onHandleClick={this.onLoginPressed} />
          <View style={styles.register_view}>
            <Text style={{ alignSelf: "center", color: "#000" }}>New User? </Text>
            <TouchableOpacity onPress={this.onRegisterPressed}>
            <Text style={{ alignSelf: "center", color: "#5C738B" }}>
              Register
            </Text>
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
  please_login: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#547C36",
    marginTop: 40,
  },
});
