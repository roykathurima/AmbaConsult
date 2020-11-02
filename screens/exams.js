import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, ImageBackground, View, ScrollView } from "react-native";
import PlainHeader from "../components/plain_header";
import SearchInput from "../components/search_input";
import ExamItem from "../components/exam_item";
export default class Exams extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  onTakeTestPressed = ()=>{
    this.props.navigation.navigate("multiple_choice_question")
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ImageBackground
          style={{
            height: 328,
            width: 383,
            position: "absolute",
            bottom: -150,
            right: -150,
          }}
          source={require("../assets/elipse_decor.png")}
        />
        <PlainHeader title="Exams Due" />
        <View style={{ marginHorizontal: 10 }}>
          <SearchInput placeholder="Search Exams" />
          <ScrollView style={{ marginBottom: 130 }}>
            <ExamItem
              course_name="Intro to Health and Social Care"
              date="23rd July 2020"
              duration="2 Hours"
              style={styles.card}
              onHandlePress={this.onTakeTestPressed}
            />
            <ExamItem
              course_name="Intro to Health and Social Care"
              date="23rd July 2020"
              duration="2 Hours"
              style={styles.card}
              onHandlePress={this.onTakeTestPressed}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 30,
  },
  card: {
    marginTop: 30,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
