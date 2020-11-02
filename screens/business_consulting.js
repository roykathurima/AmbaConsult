import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import HomeSkeleton from "../components/home_skeleton";
import GreenButton from "../components/button";

export default class BusinessConsulting extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  onContactUsPressed=()=>{
    this.props.navigation.navigate("contact_form");
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
        >
          <ScrollView style={{ marginBottom: 138 }}>
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
            <GreenButton onHandleClick={this.onContactUsPressed} text="Contact Us" />
          </ScrollView>
        </HomeSkeleton>
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
