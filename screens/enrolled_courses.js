import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, FlatList, Keyboard } from "react-native";
import SecondarySkeleton from "../components/secondary_skeleton";
import SearchInput from "../components/search_input";
import CourseItem from "../components/course_item";
import firebase from "firebase";
import FirebaseConfig from "../constants/api_keys"
import 'firebase/firestore';
import AmbaIndicator from "../components/amba_indicator"
import AsyncStorage from '@react-native-community/async-storage';

export default class EnrolledCourses extends Component {
  constructor(props){
    super(props)
    this.state={
      courses: [],
      cp: [],
      loading: false,
    }
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  componentDidMount(){
    this.setState({loading: true})
    AsyncStorage.getItem('user_id', null)
    .then(id=>{
      firebase.firestore().collection('my_courses').where('student', "==", id).get()
      .then(snapshot=>{
        snapshot.docs[0].data().courses.forEach(course=>{
          firebase.firestore().collection('courses').doc(course).get()
          .then(snap=>{
            if(snap.data()){
              const item = {
                key: snap.id,
                course_title: snap.data().course_title,
                description: snap.data().description,
                image: snap.data().course_image
              }
              this.state.courses.push(item)
              this.state.cp.push(item)
              this.setState({loading: false})
            }
          })
          .catch(err=>alert(err.message))
        })
      })
      .catch(err=>alert(err.message))
    })
    .catch(err=>alert(err.message))

  }

  onSearchTextChanged = (text)=>{
    const new_array = this.state.cp.filter(course=>{
      // alert(course.title+"vs"+text)
      return course.course_title.toLowerCase().includes(text.toLowerCase())
    })
    if(text == null || text == undefined || text == ""){
      this.setState({courses: this.state.cp})
      return;
    }
    this.setState({courses: new_array})
  }

  onViewMaterialPressed = (key)=>{
    AsyncStorage.setItem('course_id', key)
    this.props.navigation.navigate("materials")
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SecondarySkeleton
          title="Enrolled Courses"
          main_styles={styles.main_stylez}
          title_styles={styles.courses}
          calendar_visible={false}
          nav={this.onBackPressed}
        >
          <SearchInput placeholder="Search Courses" onTextChanged={this.onSearchTextChanged} onSubmit={Keyboard.dismiss}/>
          <FlatList
          style={{marginBottom:"52%", marginTop: 10}}
          data={this.state.courses}
          renderItem={itemData=>(
            <CourseItem
              button_title="View Material"
              title={itemData.item.course_title}
              img_url={{uri: itemData.item.image}}
              onHandlePress={this.onViewMaterialPressed.bind(this, itemData.item.key)}
            />
          )}
          />
          {/* <ScrollView style={{ marginBottom: 200, marginTop: 10 }}>
            <CourseItem
              button_title="View Material"
              title="Core Certificate"
              img_url={require("../assets/course_image.png")}
              onHandlePress={this.onViewMaterialPressed}
            />
            <CourseItem
              button_title="View Material"
              title="Lifestyle Workshop"
              img_url={require("../assets/course_image1.png")}
              onHandlePress={this.onViewMaterialPressed}
            />
            <CourseItem
              button_title="View Material"
              title="Train the Trainer"
              img_url={require("../assets/course_image2.png")}
              onHandlePress={this.onViewMaterialPressed}
            />
          </ScrollView> */}
        </SecondarySkeleton>
        {this.state.loading?<AmbaIndicator />:null}
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
