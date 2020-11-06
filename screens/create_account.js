import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import LogoText from "../components/logo_text";
import GreenButton from "../components/button";
import AmbaInput from "../components/amba_input";
import PhoneInput from "../components/phone_input";
import {Picker} from"@react-native-community/picker"
import firebase from "firebase";
import 'firebase/firestore';
import FirebaseConfig from "../constants/api_keys"
import AmbaIndicator from "../components/amba_indicator"

export default class CreateAccount extends Component {
  country_api_url = "https://restcountries.eu/rest/v2/all"
  constructor(props){
    super(props);
    this.state={
      current_country: "Select Country",
      country_and_code:[],
      c_code: "000",
      c_name:"",
      first_name: "",
      last_name: "",
      email:"",
      phone:"",
      password:"",
      c_password:"",
      loading: false
    }
    // alert(FirebaseConfig.projectId)
    // alert(firebase.apps.length)
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  componentDidMount(){
    // Do the country API call
    this.getCountriesFromAPI()
  }
  onCreateAccountPressed = ()=>{
    // alert("name: "+this.state.first_name +" "+ this.state.last_name + "\nPhone: "+this.state.phone + "\nCountry"+this.state.c_name+"\nEmail: "+this.state.email+"\nPassword: "+this.state.password+"\nConfirm Password: "+this.state.c_password)
    // this.setState({loading:true})
    // setTimeout(()=>{
    //   this.setState({loading:false})
    // }, 4000)
    let phoneno = /^\d+$/;
    if(!this.state.phone.match(phoneno) || this.state.phone.length < 8){
      alert("Enter a valid phone number")
      return;
    }
    if(!this.state.first_name.trim() || !this.state.last_name.trim() || !this.state.phone.trim() || !this.state.email.trim() || !this.state.current_country.trim() ||!this.state.c_name.trim()){
      alert("All fields are neccesary, Please fill out all the fields")
      return;
    }
    if(this.state.password != this.state.c_password){
      alert("make sure that you're passwords are a match")
      return;
    }
    if(this.state.password.length<6){
      alert("password should be at least 6 characters long")
    }
    // You should also add a check to ensure that the email address is unique
    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!this.state.email.match(mailformat) || this.state.email < 8){
      alert("please Enter a valid email address")
      return;
    }
    const fs_obj = {
      first_name: this.state.first_name.trim(),
      last_name: this.state.last_name.trim(),
      phone_number: this.state.phone.trim(),
      email: this.state.email.trim(),
      country_code: this.state.current_country.trim(),
      country_name: this.state.c_name.trim(),
      rank: "student"
    }
    firebase.firestore().collection('users').add(fs_obj)
    .then((value)=>{
      // Perform the auth stuff hapa
      firebase.auth().createUserWithEmailAndPassword(fs_obj.email, this.state.password)
      .then((value)=>{
        this.setState({loading:false})
        this.props.navigation.navigate("login")
      })
      .catch(error=>{
        alert("Unable to Create your Account... \nPlease Try Again Later");
      })
    })
    .catch(error=>{
      this.setState({loading:false})
      alert("Unable to Create your Account... \nPlease Try Again Later");
    });
  }
  getCountriesFromAPI = ()=>{
    return fetch(this.country_api_url)
    .then((response) => response.json())
    .then((json)=> {
      const country_array = Array.from(json)
      let obj = []
      country_array.forEach((value)=>{
        // console.log(value.name + ": " + value.callingCodes[0])
        obj.push({name: value.name, code: value.callingCodes[0]})
        // console.log(value.callingCodes[0])
      })
      this.setState({country_and_code: obj})
    })
    .catch((error)=>{console.log(error)});
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  render(){
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
            <Text style={styles.create_account}>Create Account</Text>
            <AmbaInput placeholder="First Name" onHandleTextChange={(text)=>{this.setState({first_name:text})}} />
            <AmbaInput placeholder="Last Name" onHandleTextChange={(text)=>{this.setState({last_name:text})}} />
            <AmbaInput placeholder="Email" onHandleTextChange={(text)=>{this.setState({email:text})}} />
        <View style={styles.combobox}>
          <Picker
          style={{color:"grey"}}
            mode={"dropdown"}
            selectedValue={this.state.current_country}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({current_country: itemValue, c_code: itemValue, c_name:this.state.country_and_code[itemIndex-1].name})
            }
          >
            <Picker.Item label="Select Country" value="Select Country" />
            {this.state.country_and_code.map((country)=>{
              return(<Picker.Item key={country.code} label={country.name} value={country.code} />);
            })}
          </Picker>
        </View>
            <PhoneInput pretext={"+"+this.state.c_code + ""} posttext="993 000 000" onHandleTextChange={(text)=>{this.setState({phone:text})}} />
            <AmbaInput  secure={true} placeholder="Password" onHandleTextChange={(text)=>{this.setState({password:text})}} />
            <AmbaInput secure={true} placeholder="Confirm Password" onHandleTextChange={(text)=>{this.setState({c_password:text})}} />
            <GreenButton onHandleClick={this.onCreateAccountPressed} text="Create Account" />
          </View>
        </ScrollView>
        {this.state.loading?<AmbaIndicator />:null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingTop: 20,
  },
  back_logo: {
    margin: 20,
  },
  logo: {
    alignSelf: "center",
  },
  create_account: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#547C36",
    marginTop: 40,
  },
  combobox: {
    width: "100%",
    backgroundColor: "#fff",
borderRadius: 5,
marginTop: 15,
  },
});
