import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, FlatList } from "react-native";
import SecondarySkeleton from "../components/secondary_skeleton";
import WorkshopCalendarItem from "../components/work_calendar_item";
import DateTimePicker from "@react-native-community/datetimepicker"
import firebase from "firebase";
import FirebaseConfig from "../constants/api_keys"
import 'firebase/firestore';
import 'firebase/storage';
import AmbaIndicator from "../components/amba_indicator"

export default class WorkshopsCalendar extends Component {
  constructor(props){
    super(props);
    this.state={
      showdate: false,
      date: "____/__/__",
      loading: false,
      workshops:[],
      cp:[]
    }
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  componentDidMount(){
    this.setState({loading: true})
    const {what} = this.props.route.params
    // alert(what)
    this.setState({date: this.getFormattedDate(new Date(1598051730000))})
    firebase.firestore().collection('workshops').get()
    .then(snapshot=>{
      snapshot.forEach(workshop=>{
        const item = {
          key: workshop.id,
          title: workshop.data().title,
          date: this.getItemDate(workshop.data().date),
          venue: workshop.data().venue,
          pricing: workshop.data().pricing,
          description: workshop.data().description
        }
        this.state.workshops.push(item)
        this.state.cp.push(item)
      })
      this.setState({loading: false})
    })
  }
  onViewDetailsPressed=(item)=>{
    this.props.navigation.navigate("workshop_details", {description: item.description, pricing: item.pricing, workshop_id:item.key});
  }
  onBookPressed=(item)=>{
    this.props.navigation.navigate("payment", {from: "workshops", pricing: item.pricing, workshop_id: item.key});
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  
  onDatePressed = ()=>this.setState({showdate: true})
  onDateChanged = (event, selectedDate)=>{
    this.setState({date: this.getFormattedDate(selectedDate), showdate:false})
    const disp_items = this.state.cp.filter(workshop=>{
      const dt = new Date(selectedDate + "")
      const dt1 = new Date(workshop.date + "")
      return dt.toDateString() == dt1.toDateString()
    })
    if(disp_items.length ==0){
      this.setState({workshops: this.state.cp})
      return;
    }
    this.setState({workshops: disp_items})
  }
  getFormattedDate = (dt)=>{
    const _date = new Date(dt + "")
    const month = _date.getMonth()+1 < 10? `0${_date.getMonth()+1}`:_date.getMonth()+1
    const day = _date.getDate() < 10?`0${_date.getDate()}`:_date.getDate()
    return `${_date.getFullYear()}-${month}-${day}`;
    // this.setState({date: `${_date.getFullYear()}-${month}-${day}`, showdate:false})
    // alert(`${_date.getFullYear()}-${month}-${day}`)
  }
  getItemDate = (dt)=>{
    const _date = new Date(dt + "")
    // const month = _date.toLocaleString('default', {month: 'long'})
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    const _month = month[_date.getMonth()]
    const day = _date.getDate()
    return `${day} ${_month} ${_date.getFullYear()}`;
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
          cal={this.onDatePressed}
          cal_text={this.state.date}
          nav={this.onBackPressed}
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
        <FlatList
        data={this.state.workshops}
        renderItem={itemData=>(
          <WorkshopCalendarItem 
              title={itemData.item.title}
              date={itemData.item.date}
              venue={itemData.item.venue}
              onHandleVDPress={this.onViewDetailsPressed.bind(this, itemData.item)}
              onHandleBookPress={this.onBookPressed.bind(this, itemData.item)}
            />
        )}
        />
          {/* <ScrollView>
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
          </ScrollView> */}
        </SecondarySkeleton>
        {this.state.loading? <AmbaIndicator/>:null}
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
