import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import CheckAnswer from "../components/check_answers";

export default class MultipleChoiceQuestion extends Component {
  constructor(props){
    super(props)
    this.state= {
      minutes: 1,
      seconds: 20,
      time_timer:undefined
    }
  }
  componentDidMount(){
    const t = setInterval(()=>{
      if(this.state.seconds == 0 && this.state.minutes == 0){
        clearInterval(this.state.time_timer)
        // auto-navigate to the next screen
        this.props.navigation.navigate("prose_question")
        return
      }
      if(this.state.seconds == 0){
        this.setState({minutes: --this.state.minutes, seconds: 60})
        return
      }
      this.setState({seconds: --this.state.seconds})
    }, 1000)
    this.setState({time_timer: t})
  }
  onNextPressed = ()=>{
    this.props.navigation.navigate("prose_question")
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.back_logo}>
          <Image source={require("../assets/back.png")} />
          <Text style={styles.timer}>{this.state.minutes+":"+this.state.seconds}</Text>
        </View>
        <Text style={styles.question_text}>
          Q1. Which of the following is NOT a care certificate standard?
        </Text>
        <CheckAnswer choice="Communication" />
        <CheckAnswer choice="Duty of Care" />
        <CheckAnswer choice="Health and Safety" />
        <CheckAnswer choice="Treating Bed Sores" />
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
