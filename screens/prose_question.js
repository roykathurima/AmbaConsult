import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import MultiLineInput from "../components/multiline_input";

export default class ProseQuestion extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  onNextPressed = ()=>{
    this.props.navigation.navigate("boolean_question")
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.back_logo}>
          <Image source={require("../assets/back.png")} />
          <Text style={styles.timer}>00:30</Text>
        </View>
        <Text style={styles.question_text}>
          Q2. Describe three tasks or responsibilities you may find in a care plan
        </Text>
        <View style={{ marginHorizontal: 20 }}>
          <MultiLineInput
            text_input_styles={{ borderWidth: 1, borderColor: "#707070" }}
            placeholder="Input Your Answer Here..."
          />
        </View>
        <TouchableOpacity style={styles.next_container} onPress={this.onNextPressed}>
          <Text style={styles.next}>Next</Text>
          <Image source={require("../assets/arrow.png")} />
        </TouchableOpacity>
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
  back_logo: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timer: {
    color: "#8DBA76",
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
  },
  question_text: {
    flexWrap: "wrap",
    margin: 20,
    fontSize: 15,
  },
  next: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8DBA76",
    marginEnd: 10,
  },
  next_container: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "50%",
  },
});
