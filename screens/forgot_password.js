import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import LogoText from "../components/logo_text";
import EmailField from "../components/email";
import GreenButton from "../components/button";
import AmbaIndicator from "../components/amba_indicator"
import firebase from "firebase"
import 'firebase/firestore';
import FirebaseConfig from "../constants/api_keys"

export default class ForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state= {
      email: "kathurimaroy@gmail.com",
      loading: false
    }

    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  onLoginPressed = () =>{
    this.props.navigation.navigate("login");
  }
  onStartVerificationPressed = ()=>{
    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!this.state.email.match(mailformat) || this.state.email < 8){
      alert("please Enter a valid email address")
      return;
    }
    firebase.auth().sendPasswordResetEmail(this.state.email.trim().toLowerCase())
    .then(success=>{
      alert("Password Reset Link has been successfully sent to your E-mail\nClick the Link to Reset Password then Login with the new Password");
      this.props.navigation.navigate("login")
    })
    .catch(error=> alert(error.message))
    // this.setState({loading: true})
    // firebase.firestore()
    // .collection('users').where('email', '==', this.state.email.trim()).get()
    // .then((snapshot)=>{ 
    //   // alert(snapshot.docs[0].data().phone_number)
    //   if(snapshot.docs[0] == null || snapshot.docs[0] == undefined){
    //     alert("The Email Does Not Exist in our Records")
    //   }else{
    //     // you should also concat the number with the code
    //     const code = snapshot.docs[0].data().country_code;
    //     const phone_number = `+${code}${snapshot.docs[0].data().phone_number}`;
    //     // alert(phone_number)
    //     this.setState({loading: false})
    //     this.props.navigation.navigate("verify", {email: this.state.email.trim(), phone: phone_number})
    //   }
    // })
    // .catch(error=>{
    //   alert(error)
    // })
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  render(){
    return (
      <View style={styles.container}>
        
        <StatusBar style="auto" />
        
        <View style={styles.back_logo}>
          <TouchableOpacity onPress={this.onBackPressed}>
          <Image source={require("../assets/back.png")} />
          </TouchableOpacity>
          <View style={styles.logo}>
            <Image source={require("../assets/logo.png")} />
            <LogoText />
          </View>
          <Text style={styles.forgot_password}>Forgot Password</Text>
          <Text style={styles.long_text}>
            Please Enter Your Email. A Password Reset Link will be sent this Email to enable you to Enter your new Password 
          </Text>
          <EmailField onHandleTextChange={(text)=>{this.setState({email:text})}}/>
          <GreenButton text="Send Password Reset Link" onHandleClick={this.onStartVerificationPressed}/>
          
          <View style={styles.register_view}>
            <Text style={{ alignSelf: "center", color: "#000" }}>
              Already Have an Account?
            </Text>
            <TouchableOpacity onPress={this.onLoginPressed}>
            <Text style={{ alignSelf: "center", color: "#5C738B" }}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.loading?<AmbaIndicator />:null}
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
  spinnerTextStyle:{
    color:"red"
  }
});
