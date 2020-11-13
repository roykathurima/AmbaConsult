import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, Text } from "react-native";
import PlainHeader from "../components/plain_header";
import CheckPayment from "../components/check_payment";
import GreenButton from "../components/button";
import StripeCheckout from "expo-stripe-checkout"
import firebase from "firebase";
import 'firebase/firestore';
import FirebaseConfig from "../constants/api_keys"
import AmbaIndicator from "../components/amba_indicator"
import AsyncStorage from '@react-native-community/async-storage';
export default class Payment extends Component {
  constructor(props){
    super(props);
    this.state={
      token: undefined,
      loading:false,
      student_id: "",
      pricing: undefined,
      item_id:"",
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('user_id', null)
    .then(id=>this.setState({student_id: id}))
  }
  onProceedCheckoutPressed = ()=>{
    const {from, pricing} = this.props.route.params
    if(from === "course"){
      const {course_id} = this.props.route.params
      this.setState({pricing: pricing, item_id: course_id})
      firebase.firestore().collection('my_courses').where('student', "==", this.state.student_id).get()
      .then(snapshot=>{
        const exist_array = snapshot.docs[0].data().courses.filter(entry=>{
          return entry == this.state.item_id
        })
        if(exist_array.length > 0){
          alert("Already Enrolled to this course")
        } else{
          const new_array = [...snapshot.docs[0].data().courses, this.state.item_id]
          firebase.firestore().collection('my_courses').doc(snapshot.docs[0].id)
          .update({courses: new_array})
          .then(()=>{
            alert("Enroll Successful")
            // should probably navigate after the user has clicked on the OKAY button of the alert
            this.props.navigation.navigate("home_courses")
          })
          .catch(err=>alert(err.message))
        }
      })
      .catch(()=>{
        // I am ignoring the prospect that the user may be facing other erros such as network conectivity... LOL
        // Should probably add a check in the event that the doc does not exits in so as to be able to handle all the other errors
        const fs_obj = {
          student: this.state.student_id,
          courses: [].push(this.state.item_id)
        }
        firebase.firestore().collection('my_courses').add(fs_obj)
        .then(()=>{
          alert("Enroll Successful")
          this.props.navigation.navigate("home_courses")
        })
        .catch(err=>alert(err.message))
      })
      // this.props.navigation.navigate("home_courses")
    } else if(from === "ebooks"){
      const {ebook_id, book_file, book_title, author} = this.props.route.params
      this.setState({pricing: pricing, item_id: ebook_id})
      firebase.firestore().collection('my_books').where('student', "==", this.state.student_id).get()
      .then(snapshot=>{
        const exist_array = snapshot.docs[0].data().books.filter(entry=>{
          return entry == this.state.item_id
        })
        if(exist_array.length > 0){
          alert("You have already Purchased this Book")
          // Navigate to the location of this book or navigate to the download page with this book's params
          this.props.navigation.navigate("download_ebook", {book_title:book_title, book_file: book_file, author: author})
        } else{
          const new_array = [...snapshot.docs[0].data().books, this.state.item_id]
          firebase.firestore().collection('my_books').doc(snapshot.docs[0].id)
          .update({books: new_array})
          .then(()=>{
            alert("Purchase Successful")
            // should probably navigate after the user has clicked on the OKAY button of the alert
            this.props.navigation.navigate("download_ebook", {book_title:book_title, book_file: book_file, author: author})
          })
          .catch(err=>alert(err.message))
        }
      })
      .catch(()=>{
        // I am ignoring the prospect that the user may be facing other erros such as network conectivity... LOL
        // Should probably add a check in the event that the doc does not exits in so as to be able to handle all the other errors
        const fs_obj = {
          student: this.state.student_id,
          books: [].push(this.state.item_id)
        }
        firebase.firestore().collection('my_books').add(fs_obj)
        .then(()=>{
          alert("Purchase Successful")
          this.props.navigation.navigate("download_ebook", {book_title:book_title, book_file: book_file, author: author})
        })
        .catch(err=>alert(err.message))
      })
      // this.props.navigation.navigate("download_ebook")
    } else if(from === "workshops"){
      const {workshop_id} = this.props.route.params
      this.setState({pricing: pricing, item_id: workshop_id})
      firebase.firestore().collection('my_workshops').where('student', "==", this.state.student_id).get()
      .then(snapshot=>{
        const exist_array = snapshot.docs[0].data().workshops.filter(entry=>{
          return entry == this.state.item_id
        })
        if(exist_array.length > 0){
          alert("Workshop has already been booked")
        } else{
          const new_array = [...snapshot.docs[0].data().workshops, this.state.item_id]
          firebase.firestore().collection('my_workshops').doc(snapshot.docs[0].id)
          .update({workshops: new_array})
          .then(()=>{
            alert("Booking Successful")
            // should probably navigate after the user has clicked on the OKAY button of the alert
            this.props.navigation.navigate("home_workshops")
          })
          .catch(err=>alert(err.message))
        }
      })
      .catch(()=>{
        // I am ignoring the prospect that the user may be facing other erros such as network conectivity... LOL
        // Should probably add a check in the event that the doc does not exits in so as to be able to handle all the other errors
        const fs_obj = {
          student: this.state.student_id,
          workshops: [].push(this.state.item_id)
        }
        firebase.firestore().collection('my_workshops').add(fs_obj)
        .then(()=>{
          alert("Booking Successful")
          this.props.navigation.navigate("home_workshops")
        })
        .catch(err=>alert(err.message))
      })
      // this.props.navigation.navigate("home_workshops")
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
