import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import HomeSkeleton from "../components/home_skeleton";
import GreenButton from "../components/button";

export default class WorkshopDetails extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  onBookPressed = ()=>{
    this.props.navigation.navigate("payment", {from: "workshop_details"});
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <HomeSkeleton
          title="Workshop Details"
          img_url={require("../assets/big_workshop.png")}
          image_styles={styles.big_workshop}
          main_styles={styles.main_body}
          title_styles={styles.workshops}
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
          text="$19 BOOK"
          onHandleClick={this.onBookPressed}
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
  workshops: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginStart: -20,
    // marginEnd: 80,
  },
  big_workshop: {
    alignSelf: "flex-end",
    width: 201,
    height: 216,
  },
  main_body: {
    backgroundColor: "#fff",
    width: "100%",
    height: "77%",
    marginTop: -110,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
  main_text: {
    flexWrap: "wrap",
    margin: 10,
    fontSize: 15,
  },
});
