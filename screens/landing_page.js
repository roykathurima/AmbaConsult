import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, Text, Image, View, ImageBackground } from "react-native";
import HomeCard from "../components/home_card";

export default class LandingPage extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  onBusinessConsultingPressed=()=>{
    this.props.navigation.navigate("business_stack");
  }
  onCoursesListPressed=()=>{
    this.props.navigation.navigate("courses_stack");
  }
  onWorkshopsPressed=()=>{
    this.props.navigation.navigate("workshop_stack");
  }
  onEBooksPressed=()=>{
    this.props.navigation.navigate("ebook_stack");
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
