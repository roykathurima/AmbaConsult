import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View } from "react-native";
import AccountHeadBanner from "../components/ac_head_banner";
import WorkshopItem from "../components/workshop_item";

export default class Reminders extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  onExamsPressed=()=>{
    this.props.navigation.navigate("exam_stack")
  }
  onWorkshopsPressed=()=>{}
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <AccountHeadBanner title="Reminders" nav={this.onBackPressed} />
        <View style={{ marginTop: 30 }}>
          <WorkshopItem onHandlePress={this.onExamsPressed} title="Exams" />
          <WorkshopItem onHandlePress={this.onWorkshopsPressed} title="Workshops" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
});
