import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import HomeSkeleton from "../components/home_skeleton";
import GreenButton from "../components/button";
import firebase from "firebase";
import 'firebase/firestore';
import FirebaseConfig from "../constants/api_keys"
import AmbaIndicator from "../components/amba_indicator"
// import AsyncStorage from '@react-native-community/async-storage';
export default class BusinessConsulting extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: "",
      loading: false
    }
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  // componentDidMount(){
  //   firebase.messaging().getToken() 
  //   .then(token=>{
  //     console.log(token)
  //     alert(token)
  //   })
  // }
  componentDidMount(){
    this.setState({loading: true})
    firebase.firestore()
    .collection('business_consulting').get()
    .then((snapshot)=>{
      this.setState({message:snapshot.docs[0].data().text, loading:false})
    })
    .catch(err=>alert(err.message))
    // AsyncStorage.getItem("user_id",null)
    // .then(key=>alert(key))
  }
  onContactUsPressed=()=>{
    this.props.navigation.navigate("contact_form");
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <HomeSkeleton
          title="Business Consulting"
          img_url={require("../assets/big_consulting.png")}
          image_styles={{ width: 194, height: 146 }}
          main_styles={styles.main_stylez}
          title_styles={styles.consulting}
          nav={this.onBackPressed}
        >
          <ScrollView style={{ marginBottom: 138 }}>
            <Text style={styles.main_text}>
              {this.state.message}
            </Text>
            <GreenButton onHandleClick={this.onContactUsPressed} text="Contact Us" />
          </ScrollView>
        </HomeSkeleton>
        {this.state.loading?<AmbaIndicator />:null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  main_stylez: {
    marginTop: -30,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    opacity: 0.9,
  },
  consulting: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginStart: -10,
  },
  main_text: {
    flexWrap: "wrap",
    margin: 10,
    fontSize: 15,
  },
});
