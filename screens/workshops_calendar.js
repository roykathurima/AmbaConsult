import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import SecondarySkeleton from "../components/secondary_skeleton";
import WorkshopCalendarItem from "../components/work_calendar_item";

export default class WorkshopsCalendar extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  onViewDetailsPressed=()=>{
    this.props.navigation.navigate("workshop_details");
  }
  onBookPressed=()=>{
    this.props.navigation.navigate("payment", {from: "workshops"});
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  componentDidMount(){
    const {what} = this.props.route.params
    alert(what)
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SecondarySkeleton
          title="Workshops Calendar"
          main_styles={styles.main_stylez}
          title_styles={styles.work_calendar}
          calendar_visible={true}
          nav={this.onBackPressed}
        >
          <ScrollView>
            <WorkshopCalendarItem 
              title="Introduction to Health and Social Care"
              date="23rd July 2020"
              venue="Heart of England Conference"
              onHandleVDPress={this.onViewDetailsPressed}
              onHandleBookPress={this.onBookPressed}
            />
            <WorkshopCalendarItem
              title="Introduction to Health and Social Care"
              date="23rd September 2020"
              venue="Heart of England Conference"
              onHandleVDPress={this.onViewDetailsPressed}
              onHandleBookPress={this.onBookPressed}
            />
            <WorkshopCalendarItem
              title="Introduction to Health and Social Care"
              date="13th November 2020"
              venue="Heart of England Conference"
              onHandleVDPress={this.onViewDetailsPressed}
              onHandleBookPress={this.onBookPressed}
            />
          </ScrollView>
        </SecondarySkeleton>
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
  main_stylez: {
    marginTop: 5,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 218,
  },
  work_calendar: {
    fontSize: 18,
    fontWeight: "bold",
    marginStart: 10,
    color: "#5C738B",
  },
});
