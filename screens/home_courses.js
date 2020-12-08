import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, FlatList, Keyboard } from "react-native";
import HomeSkeleton from "../components/home_skeleton";
import SearchInput from "../components/search_input";
import CourseItem from "../components/course_item";
import firebase from "firebase";
import FirebaseConfig from "../constants/api_keys"
import 'firebase/firestore';
import 'firebase/storage';
import AmbaIndicator from "../components/amba_indicator"

export default class HomeCoursesList extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: false,
      courses: [],
      cp: []
    }
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  componentDidMount(){
    this.setState({loading: true})
    firebase.firestore().collection('courses').get()
    .then(snapshot=>{
      snapshot.forEach(course=>{
        const item = {
          key: course.id,
          title: course.data().course_title,
          image: course.data().course_image,
          description: course.data().description,
          pricing: course.data().pricing
        }
        this.state.courses.push(item)
        this.state.cp.push(item)
      })
      this.setState({loading: false})
    })
  }
  onViewPressed = (item)=>{
    this.props.navigation.navigate("course_detail", {description: item.description, pricing: item.pricing, course_id: item.key})
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  onSearchTextChanged = (text)=>{
    const new_array = this.state.cp.filter(course=>{
      // alert(course.title+"vs"+text)
      return course.title.toLowerCase().includes(text.toLowerCase())
    })
    if(text == null || text == undefined || text == ""){
      this.setState({courses: this.state.cp})
      return;
    }
    this.setState({courses: new_array})
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <HomeSkeleton
          title="Courses List"
          img_url={require("../assets/big_courses.png")}
          image_styles={{ width: 171, height: 172 }}
          main_styles={styles.main_stylez}
          title_styles={styles.courses}
          nav={this.onBackPressed}
        >
          <SearchInput placeholder="Search Courses" onTextChanged={this.onSearchTextChanged} onSubmit={Keyboard.dismiss}/>
          <FlatList
          style={{marginBottom:"32%", marginTop: 10}}
          data={this.state.courses}
          renderItem={itemData=>(
            <CourseItem
              title={itemData.item.title}
              img_url={{uri: itemData.item.image}}
              onHandlePress={this.onViewPressed.bind(this, itemData.item)}
            />
          )}
          />
          {/* <ScrollView style={{ marginBottom: 120, marginTop: 10 }}>
            <CourseItem
              title="Core Certificate"
              img_url={require("../assets/course_image.png")}
              onHandlePress={this.onViewPressed}
            />
            <CourseItem
              title="Lifestyle Workshop"
              img_url={require("../assets/course_image1.png")}
              onHandlePress={this.onViewPressed}
            />
            <CourseItem
              title="Train the Trainer"
              img_url={require("../assets/course_image2.png")}
              onHandlePress={this.onViewPressed}
            />
          </ScrollView> */}
        </HomeSkeleton>
        {this.state.loading?<AmbaIndicator/>:null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  main_stylez: {
    marginTop: -75,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 15,
  },
  courses: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginStart: -70,
  },
  main_text: {
    flexWrap: "wrap",
    margin: 10,
    fontSize: 15,
  },
});
