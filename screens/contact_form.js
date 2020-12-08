import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView } from "react-native";
import LogoText from "../components/logo_text";
import AmbaInput from "../components/amba_input";
import GreenButton from "../components/button";
import MultiLineInput from "../components/multiline_input";
import firebase from "firebase";
import 'firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import AmbaIndicator from "../components/amba_indicator"
export default class ContactForm extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name: "",
      email:"",
      organization: "",
      subject: "",
      message: "",
      loading: false
    }
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  onSendMessagePressed = ()=>{
    this.setState({loading: true})
    // alert("Hey there Stranger...")
    if(!this.state.first_name.trim() || !this.state.email.trim() || !this.state.organization.trim() || !this.state.subject.trim() || !this.state.message.trim()){
      alert("Please Fill out all the fields...");
      this.setState({loading: false})
      return;
    }
    // alert(`Name: ${this.state.first_name}\nEmail: ${this.state.email}\nOrganization: ${this.state.organization}\nSubject: ${this.state.subject}\nMessage: ${this.state.message}`);
    const fs_obj = {
      first_name: this.state.first_name.trim(),
      email: this.state.email.trim(),
      organization: this.state.organization.trim(),
      subject: this.state.subject.trim(),
      message: this.state.message
    }
    AsyncStorage.getItem('user_id', null)
    .then((id)=>{
      firebase.firestore().collection('my_consultations').add({
        user_id: id,
        ...fs_obj
      })
      .then(success=>{
        // Navigate to Home maybe...
        this.setState({loading: false})
        this.props.navigation.navigate('home');
      })
    })
  }
  render(){
    return (
      <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.back_logo}>
          <TouchableOpacity onPress={this.onBackPressed}>
          <Image source={require("../assets/back.png")} />
          </TouchableOpacity>
          <View style={styles.logo}>
            <Image source={require("../assets/logo.png")} />
            <LogoText />
          </View>
          <Text style={styles.contact_us}>Contact Us</Text>
          <AmbaInput placeholder="Your First Name" onHandleTextChange={(text)=>{this.setState({first_name:text})}} />
          <AmbaInput placeholder="Your Email" onHandleTextChange={(text)=>{this.setState({email:text})}} />
          <AmbaInput placeholder="Organization" onHandleTextChange={(text)=>{this.setState({organization:text})}} />
          <AmbaInput placeholder="Subject" onHandleTextChange={(text)=>{this.setState({subject:text})}} />
          <MultiLineInput placeholder="Enter Your Message Here..." onHandleTextChange={(text)=>{this.setState({message:text})}}/>
          <GreenButton text="Send Message" onHandleClick={this.onSendMessagePressed} />
        </View>
        {this.state.loading?<AmbaIndicator />:null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingVertical: 20,
    marginBottom:1,
  },
  back_logo: {
    margin: 20,
  },
  logo: {
    alignSelf: "center",
    marginTop: "2%",
  },
  contact_us: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#547C36",
    marginTop: 40,
    alignSelf: "center",
  },
});
