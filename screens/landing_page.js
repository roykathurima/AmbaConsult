import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, Text, Image, View, ImageBackground } from "react-native";
import HomeCard from "../components/home_card";
import AsyncStorage from '@react-native-community/async-storage';
import AmbaIndicator from "../components/amba_indicator"

export default class LandingPage extends Component {
  constructor(props){
    super(props);
    this.state={
      student: null,
      loading: false
    }
  }
  componentDidMount(){
    this.setState({loading: true})
    AsyncStorage.getItem('user_id', null)
    .then(id=>{
      this.setState({student: id, loading: false})
    })
  }
  componentDidUpdate(){
    AsyncStorage.getItem('user_id', null)
    .then(id=>{
      // alert(id)
      this.setState({student: id})
    })
  }
  // ALGORITHM
  // if user_id exists we navigate, else redirect to login page
  onBusinessConsultingPressed=()=>{
    if(this.state.student != null || this.state.student != undefined ){
      this.props.navigation.navigate("home_stack", {intended_screen: "business"});
    } else{
      this.props.navigation.navigate("login")
    }
  }
  onCoursesListPressed=()=>{
    if(this.state.student != null || this.state.student != undefined ){
      this.props.navigation.navigate("home_stack", {intended_screen: "courses"});
    } else{
      this.props.navigation.navigate('login');
    }
  }
  onWorkshopsPressed=()=>{
    if(this.state.student != null || this.state.student != undefined ){
      this.props.navigation.navigate("home_stack", {intended_screen: "workshops"});
    } else{
      this.props.navigation.navigate('login')
    }
  }
  onEBooksPressed=()=>{
    if(this.state.student != null || this.state.student != undefined ){
      this.props.navigation.navigate("home_stack", {intended_screen: "ebooks"});
    } else{
      this.props.navigation.navigate('login')
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ImageBackground
          style={styles.callout}
          source={require("../assets/home_callout.png")}
        >
          <Text style={styles.callout_text}>
            Hello,{"\n"}Welcome to Amba Consult
          </Text>
        </ImageBackground>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <HomeCard
            text="Business Consulting"
            img_url={require("../assets/home_bs_consulting.png")}
            onHandlePress={this.onBusinessConsultingPressed}
          />
          <HomeCard
            text="Courses List"
            img_url={require("../assets/home_courses_list.png")}
            onHandlePress={this.onCoursesListPressed}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <HomeCard
            text="Workshops"
            img_url={require("../assets/home_workshops.png")}
            onHandlePress={this.onWorkshopsPressed}
          />
          <HomeCard
            text="E-Books"
            img_url={require("../assets/home_ebooks.png")}
            onHandlePress={this.onEBooksPressed}
          />
        </View>
        {this.state.loading?<AmbaIndicator/>:null}
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
  callout: {
    width: 298,
    height: 189,
    marginTop: 10,
    paddingTop: 50,
    paddingLeft: 20,
  },
  callout_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5C738B",
  },
});
