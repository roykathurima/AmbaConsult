import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View } from "react-native";
import WorkshopItem from "../components/workshop_item";
export default class MyActivities extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  onEnrolledCoursesPressed = ()=>{
    this.props.navigation.navigate("enrolled_courses")
  }
  onMyBooksPressed = ()=>{
    this.props.navigation.navigate("purchased_ebooks")
  }
  onEnrolledWorkshopsPressed = ()=>{
    this.props.navigation.navigate("enrolled_workshops")
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={{ marginTop: 30 }}>
          <WorkshopItem title="Enrolled Courses" onHandlePress={this.onEnrolledCoursesPressed} />
          <WorkshopItem title="My Books" onHandlePress={this.onMyBooksPressed}/>
          <WorkshopItem title="Enrolled Workshops" onHandlePress={this.onEnrolledWorkshopsPressed} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
