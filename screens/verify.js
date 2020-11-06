import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import GreenButton from "../components/button";
import VerifyingModal from "../components/verifying_modal";
import firebase from "firebase"
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

export default class Verify extends Component {
  // const [modalVisible, setModalVisible] = useState(false);
  constructor(props){
    super(props);
    this.state={
      modalVisible: false,
      confirmResults: {},
      enteredCode: ""
    }
    this.recaptchaVerifier = React.createRef();
    this.firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  }
  componentDidMount(){
    const {email, phone} = this.props.route.params
    // alert(`Email: ${email} \n Phone: ${phone}`)
    firebase.auth()
    .signInWithPhoneNumber(phone, this.recaptchaVerifier.current)
    .then(confirmResult=>{
      this.setState({confirmResults: confirmResult})
    })
    .catch(error=>{
      console.log(error.message)
    })
}
  
  onHandleVerifyPress = () => {
    this.setState({modalVisible: true})
    // verify the user before navigating onto another screen...

    this.state.confirmResults.confirm(this.state.enteredCode)
    .then((user)=>{
      console.log(user)
      if(user != null && user !=undefined){
        this.setState({modalVisible: false})
        this.props.navigation.navigate("reset_password", {user: user.user});
      }
    })

    // setTimeout(() => {
    //   this.setState({modalVisible: false})
      // this.props.navigation.navigate("reset_password")
    // }, 2000);
  };
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  render(){
    return (
      <View style={styles.container}>
        <VerifyingModal modalVisible={this.state.modalVisible} />
        <FirebaseRecaptchaVerifierModal ref={this.recaptchaVerifier} firebaseConfig={this.firebaseConfig} />
        <StatusBar style="auto" />
        <ImageBackground
          style={{
            width: 200,
            height: 100,
            position: "absolute",
          }}
          source={require("../assets/verify_ellipse.png")}
        >
          <TouchableOpacity style={styles.back_logo} onPress={this.onBackPressed}>
            <Image source={require("../assets/back.png")} />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.content}>
          <Image source={require("../assets/verify.png")} />
          <Text style={styles.verification_text}>Verification</Text>
          <Text style={styles.instructions_text}>
            Enter a 6 Digit Number that We Sent To Your Phone
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TextInput
      style={styles.verification_input}
      maxLength={1}
      returnKeyType={"next"}
      autoFocus={true}
      ref={(input) => { this.firstTextInput = input; }}
      onSubmitEditing={() => { this.secondTextInput.focus(); }}
      onChangeText={(text)=>this.state.enteredCode=text}
    />
          <TextInput
      style={styles.verification_input}
      maxLength={1}
      returnKeyType={"next"}
      ref={(input) => { this.secondTextInput = input; }}
      onSubmitEditing={() => { this.thirdTextInput.focus(); }}
      onChangeText={(text)=>this.state.enteredCode+=text}
    />
          <TextInput
      style={styles.verification_input}
      maxLength={1}
      returnKeyType={"next"}
      ref={(input) => { this.thirdTextInput = input; }}
      onSubmitEditing={() => { this.fourthTextInput.focus(); }}
      onChangeText={(text)=>this.state.enteredCode+=text}
    />
          <TextInput
      style={styles.verification_input}
      maxLength={1}
      returnKeyType={"next"}
      ref={(input) => { this.fourthTextInput = input; }}
      onSubmitEditing={() => { this.fifthTextInput.focus(); }}
      onChangeText={(text)=>this.state.enteredCode+=text}
    />
          <TextInput
      style={styles.verification_input}
      maxLength={1}
      returnKeyType={"next"}
      ref={(input) => { this.fifthTextInput = input; }}
      onSubmitEditing={() => { this.lastTextInput.focus(); }}
      onChangeText={(text)=>this.state.enteredCode+=text}
    />
          <TextInput
      style={styles.verification_input}
      maxLength={1}
      ref={(input) => { this.lastTextInput = input; }}
      onChangeText={(text)=>this.state.enteredCode+=text}
    />
          </View>
          <GreenButton
            style={{ width: "90%", marginTop: 70 }}
            text="Verify"
            onHandleClick={this.onHandleVerifyPress}
          />
          <Text style={styles.resend_code}>Re-send Code</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingTop: 150,
  },
  back_logo: {
    marginHorizontal: 20,
    marginTop: 50,
  },
  content: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  verification_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#547C36",
    marginTop: 40,
  },
  instructions_text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5C738B",
    marginTop: 30,
  },
  resend_code: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "#8DBA76",
    textDecorationLine: "underline",
  },
  verification_input:{
    borderBottomColor: "#547C36",
    borderBottomWidth: 2,
    width: "10%",
    marginVertical: 30,
    marginHorizontal: 10,
    textAlign: "center",
  }
});
