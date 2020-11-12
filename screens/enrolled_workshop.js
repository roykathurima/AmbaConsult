import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import SecondarySkeleton from "../components/secondary_skeleton";
import EnrolledWorkshopCalendarItem from "../components/enrolled_cal_item";
import DateTimePicker from "@react-native-community/datetimepicker"

export default class EnrolledWorkshops extends Component {
  constructor(props){
    super(props);
    this.state={
      showdate: false,
      date: undefined
    }
  }
  componentDidMount(){
    this.setState({date: this.getFormattedDate(new Date(1598051730000))})
  }
  onViewDetailsPressed=()=>{
    this.props.navigation.navigate("enrolled_wdetails")
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  onDatePressed = ()=>this.setState({showdate: true})
  onDateChanged = (event, selectedDate)=>{
    this.setState({date: this.getFormattedDate(selectedDate), showdate:false})
  }
  getFormattedDate = (dt)=>{
    const _date = new Date(dt + "")
    const month = _date.getMonth()+1 < 10? `0${_date.getMonth()+1}`:_date.getMonth()+1
    const day = _date.getDate() < 10?`0${_date.getDate()}`:_date.getDate()
    return `${_date.getFullYear()}-${month}-${day}`;
    // this.setState({date: `${_date.getFullYear()}-${month}-${day}`, showdate:false})
    // alert(`${_date.getFullYear()}-${month}-${day}`)
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SecondarySkeleton
          title="Enrolled Workshops Calendar"
          main_styles={styles.main_stylez}
          title_styles={styles.courses}
          calendar_visible={true}
          nav={this.onBackPressed}
          cal={this.onDatePressed}
          cal_text={this.state.date}
        >
          {this.state.showdate?<DateTimePicker
          testID="dateTimePicker"
          value={new Date(1598051730000)}
          mode="date"
          is24Hour={true}
          display="default"
          style={{backgroundColor:"red"}}
          onChange={this.onDateChanged}
        />:null}
          <ScrollView style={{ marginBottom: 210 }}>
            <EnrolledWorkshopCalendarItem
              title="Introduction to Health and Social Care"
              date="23rd July 2020"
              venue="Heart of England Conference"
              onHandlePress={this.onViewDetailsPressed}
            />
            <EnrolledWorkshopCalendarItem
              title="Introduction to Health and Social Care"
              date="23rd September 2020"
              venue="Heart of England Conference"
              onHandlePress={this.onViewDetailsPressed}
            />
            <EnrolledWorkshopCalendarItem
              title="Introduction to Health and Social Care"
              date="13th November 2020"
              venue="Heart of England Conference"
              onHandlePress={this.onViewDetailsPressed}
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
    paddingTop: 10,
  },
  main_stylez: {
    marginTop: 10,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 15,
  },
  courses: {
    fontSize: 18,
    fontWeight: "bold",
    marginStart: 10,
    color: "#5C738B",
  },
  main_text: {
    flexWrap: "wrap",
    margin: 10,
    fontSize: 15,
  },
});
