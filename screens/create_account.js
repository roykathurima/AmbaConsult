import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import LogoText from "../components/logo_text";
import GreenButton from "../components/button";
import AmbaInput from "../components/amba_input";
import PhoneInput from "../components/phone_input";
import {Picker} from"@react-native-community/picker"

export default class CreateAccount extends Component {
  country_api_url = "https://restcountries.eu/rest/v2/all"
  constructor(props){
    super(props);
    this.state={
      current_country: "Select Country",
      country_and_code:[],
      c_code: "44"
    }
  }
  componentDidMount(){
    // Do the country API call
    this.getCountriesFromAPI()
  }
  getCountriesFromAPI = ()=>{
    return fetch(this.country_api_url)
    .then((response) => response.json())
    .then((json)=> {
      const country_array = Array.from(json)
      let obj = []
      country_array.forEach((value)=>{
        console.log(value.name + ": " + value.callingCodes[0])
        obj.push({name: value.name, code: value.callingCodes[0]})
        // console.log(value.callingCodes[0])
      })
      this.setState({country_and_code: obj})
    })
    .catch((error)=>{console.log(error)});
  }
  render(){
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.back_logo}>
            <Image source={require("../assets/back.png")} />
            <View style={styles.logo}>
              <Image source={require("../assets/logo.png")} />
              <LogoText />
            </View>
            <Text style={styles.create_account}>Create Account</Text>
            <AmbaInput placeholder="First Name" />
            <AmbaInput placeholder="Last Name" />
            <AmbaInput placeholder="Email" />
        <View style={styles.combobox}>
          <Picker
          style={{color:"grey"}}
            mode={"dropdown"}
            selectedValue={this.state.current_country}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({current_country: itemValue, c_code: itemValue})
            }
          >
            <Picker.Item label="Select Country" value="Select Country" />
            {this.state.country_and_code.map((country)=>{
              return(<Picker.Item key={country.code} label={country.name} value={country.code} />);
            })}
          </Picker>
        </View>
            <PhoneInput pretext={"+"+this.state.c_code + ""} posttext="993 000 000" />
            <AmbaInput secure={true} placeholder="Password" />
            <AmbaInput secure={true} placeholder="Confirm Password" />
            <GreenButton text="Create Account" />
          </View>
        </ScrollView>
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
