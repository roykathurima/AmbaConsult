import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";
import PlainHeader from "../components/plain_header";
import CheckPayment from "../components/check_payment";
import GreenButton from "../components/button";
import StripeCheckout from "expo-stripe-checkout"
export default class Payment extends Component {
  constructor(props){
    super(props);
    this.state={
      token: undefined
    }
  }
  onProceedCheckoutPressed = ()=>{
    const {from} = this.props.route.params
    if(from === "course"){
      this.props.navigation.navigate("home_courses")
    } else if(from === "ebooks"){
      this.props.navigation.navigate("download_ebook")
    }
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <PlainHeader title="Payment" nav={this.onBackPressed}/>
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
  //     <StripeCheckout
  //   publicKey="pk_test_51HKfajBz4SoofGZfS16py5wLUesYR62Tkk3Yll1F5FgfEJPZtIzbgbIMEin9noN4abxhW6SpDQKMfunyQpDrWHHk00b5Xfe67S"
  //   amount={10000}
  //   imageUrl="https://firebasestorage.googleapis.com/v0/b/ambaconsult.appspot.com/o/images%2Fcourse_image.png?alt=media&token=63d5ae26-2c3b-4249-b5a2-310618951694"
  //   storeName="Stripe Checkout"
  //   description="Test"
  //   currency="USD"
  //   allowRememberMe={false}
  //   prepopulatedEmail="smartapps.ambaconsult@gmail.com"
  //   onClose={this.onClose}
  //   onPaymentSuccess={this.onPaymentSuccess}
  //   style={{resizeMode: "cover"}}
  // />
    );
  }

  // onPaymentSuccess = (token) => {
  //   alert("here we are")
  //   this.setState({ token: token })
  //   alert(token)
  // }
   
  // onClose = () => {
  //   // maybe navigate to other screen here?
  //   alert("window closed")
  //   if(this.state.token){
  //     this.onProceedCheckoutPressed()
  //   }
  // }

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
