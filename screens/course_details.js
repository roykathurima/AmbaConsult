import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import HomeSkeleton from "../components/home_skeleton";
import GreenButton from "../components/button";

export default class CourseDetails extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  onEnrollPressed = ()=>{
    this.props.navigation.navigate("payment", {from:"course"});
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <HomeSkeleton
          title="Course Details"
          img_url={require("../assets/big_courses.png")}
          image_styles={{ width: 171, height: 172 }}
          main_styles={styles.main_stylez}
          title_styles={styles.courses}
        >
          <ScrollView>
            <Text style={styles.main_text}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
              et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
              Lorem ipsum dolor sit amet. eos et accusam et justo duo dolores et
              ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
              sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
              no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
              dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua.
            </Text>
          </ScrollView>
        </HomeSkeleton>
        <GreenButton
          style={{
            width: "85%",
            alignSelf: "center",
            marginTop: 0,
            marginBottom: 50,
          }}
          text="$120 ENROLL"
          onHandleClick={this.onEnrollPressed}
        />
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
    marginTop: -75,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 15,
    opacity: 0.9,
  },
  courses: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginStart: -70,
  },
  main_text: {
    flexWrap: "wrap",
    margin: 10,
    fontSize: 15,
  },
});
