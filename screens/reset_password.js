import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import LogoText from "../components/logo_text";
import PasswordField from "../components/password";
import GreenButton from "../components/button";
import PasswordResetSuccess from "../components/password_reset_success";
import firebase from "firebase"
import FirebaseConfig from "../constants/api_keys"
import AmbaIndicator from "../components/amba_indicator"

export default class ResetPassword extends Component {
  // const [modalVisible, setModalVisible] = useState(false);
  constructor(props){
    super(props);
    this.state={
      modalVisible: false,
      loading: false,
      password: "",
      c_password: ""
    }
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  handleSavePasswordClick = () => {
    // alert("what's good...");
    // setModalVisible(true);
    this.setState({loading: true});
    if(this.state.c_password !== this.state.password){
      this.setState({loading:false});
      alert("The Passwords need to match")
      return;
    }
    // const user = firebase.auth().currentUser;
    const {user} = this.props.route.params;
    user.updatePassword(this.state.password)
    .then(()=>{
      // alert("Password has been updated successfully")
      this.setState({loading: false, modalVisible:true})
      setTimeout(() => {
      this.setState({modalVisible: false});
      this.props.navigation.navigate("login")
    }, 2000);
    })
    .catch((err)=>alert(err.message))

    // setTimeout(() => {
    //   this.setState({modalVisible: false});
    //   this.props.navigation.navigate("login")
    // }, 2000);
  };
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  render(){
    return (
      <View style={styles.container}>
        <PasswordResetSuccess modalVisible={this.state.modalVisible} />
        <StatusBar style="auto" />
        <View style={styles.back_logo}>
          <TouchableOpacity onPress={this.onBackPressed}>
          <Image source={require("../assets/back.png")} />
          </TouchableOpacity>
          <View style={styles.logo}>
            <Image source={require("../assets/logo.png")} />
            <LogoText />
          </View>
          <Text style={styles.reset_password}>Reset Password</Text>
  
          <PasswordField placeholder="New Password" onHandleTextChange={(text)=>{this.setState({password:text})}}/>
          <PasswordField placeholder="Confrim Password" onHandleTextChange={(text)=>{this.setState({c_password:text})}}/>
  
          <GreenButton
            onHandleClick={this.handleSavePasswordClick}
            text="Save Password"
          />
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

  reset_password: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#547C36",
    marginTop: 40,
    alignSelf: "center",
  },
});
