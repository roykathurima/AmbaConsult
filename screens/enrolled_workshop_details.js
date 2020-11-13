import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import HomeSkeleton from "../components/home_skeleton";

export default class EnrolledWorkshopDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      description: "",
    }
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  componentDidMount(){
    const {description} = this.props.route.params
    this.setState({description: description})
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
          nav={this.onBackPressed}
        >
          <ScrollView>
            <Text style={styles.main_text}>{this.state.description}</Text>
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
    height: "70%",
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
