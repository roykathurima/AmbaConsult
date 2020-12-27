import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, FlatList } from "react-native";
import SecondarySkeleton from "../components/secondary_skeleton";
import EnrolledWorkshopCalendarItem from "../components/enrolled_cal_item";
import DateTimePicker from "@react-native-community/datetimepicker"
import firebase from "firebase";
import FirebaseConfig from "../constants/api_keys"
import 'firebase/firestore';
import AmbaIndicator from "../components/amba_indicator"
import AsyncStorage from '@react-native-community/async-storage';

export default class EnrolledWorkshops extends Component {
  constructor(props){
    super(props);
    this.state={
      showdate: false,
      date: undefined,
      loading: false,
      workshops: [],
      cp: [],
    }
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  componentDidMount(){
    this.setState({loading: true})
    this.setState({date: this.getFormattedDate(new Date(1598051730000))})
    AsyncStorage.getItem('user_id', null)
    .then(id=>{
      firebase.firestore().collection('my_workshops').where('student', '==', id).get()
      .then(snapshot=>{
        snapshot.docs[0].data().workshops.forEach(workshop=>{
          console.log(workshop)
          firebase.firestore().collection('workshops').doc(workshop).get()
          .then(snap=>{
            console.log(snap.data())
            // The workshop may be deleted but still appear in the enrolled array...
            // Thus, I perform this check to avoid unneccesary error alerts
            if(snap.data()){
              const item = {
                key: snap.id,
                title: snap.data().title,
                date: snap.data().date,
                venue: snap.data().venue,
                description:snap.data().description,
              }
              this.state.workshops.push(item)
              this.state.cp.push(item)
              this.setState({loading: false})
            }
          })
          .catch(err=>alert(err.message))
        })
      })
      .catch(err=>alert(err.message))
    })
  }
  onViewDetailsPressed=(item)=>{
    this.props.navigation.navigate("enrolled_wdetails", {description: item.description})
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
        <FlatList
        data={this.state.workshops}
        renderItem={itemData=>(
          <EnrolledWorkshopCalendarItem
              title={itemData.item.title}
              date={itemData.item.date}
              venue={itemData.item.venue}
              onHandlePress={this.onViewDetailsPressed.bind(this, itemData.item)}
            />
        )}
        />
          {/* <ScrollView style={{ marginBottom: 210 }}>
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
          </ScrollView> */}
        </SecondarySkeleton>
        {this.state.loading?<AmbaIndicator/>:null}
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
    width: "66%",
  },
  main_text: {
    flexWrap: "wrap",
    margin: 10,
    fontSize: 15,
  },
});
