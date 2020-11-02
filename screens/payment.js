import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";
import PlainHeader from "../components/plain_header";
import CheckPayment from "../components/check_payment";
import GreenButton from "../components/button";
export default class Payment extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  onProceedCheckoutPressed = ()=>{
    const {from} = this.props.route.params
    if(from === "course"){
      this.props.navigation.navigate("home_courses")
    } else if(from === "ebooks"){
      this.props.navigation.navigate("download_ebook")
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <PlainHeader title="Payment" />
        <View style={{ marginHorizontal: 20, marginTop: 40 }}>
          <Text style={styles.main_text}>Select Payment Option</Text>
          <CheckPayment choice="Google Pay" />
          <CheckPayment choice="Card" />
          <CheckPayment choice="Pay Pal" />
          <View style={{ marginTop: "90%" }}>
            <GreenButton onHandleClick={this.onProceedCheckoutPressed} text="Proceed to Checkout" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  main_text: {
    fontSize: 18,
  },
});
