import React, { Component } from "react";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  Alert,
} from "react-native";
import VideoItem from "../components/video_item";
import firebase from "firebase";
import 'firebase/firestore';
import FirebaseConfig from "../constants/api_keys"
import AmbaIndicator from "../components/amba_indicator"
import AsyncStorage from '@react-native-community/async-storage';
import SearchInput from "../components/search_input";

export default class MaterialVideo extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: false,
      videos: [],
      cp: [],
      playing_video: {},
      no_video: false,
    }
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  async componentDidMount(){
    this.setState({loading: true})
    const key = await AsyncStorage.getItem('course_id', null)
    firebase.firestore().collection('course_material').where('type', "==", "video").where('course', '==', key).get()
    .then(snapshot=>{
      // alert(snapshot.docs.length)
      // console.log(snapshot.docs)
      if(snapshot.docs.length == 0){
        alert("No Video Materials associated with this Course Exist")
        firebase.firestore().collection('course_material').where('type', '==', 'handout').where('course', '==', key).get()
        .then(snap=>{
          // alert(snap.docs.length)
          if(snap.docs.length > 0){
            // navigate to the handouts
            this.props.navigation.navigate('material_handouts')
          } else{
            this.props.navigation.goBack(null)
          }
        })
        return
      }
      snapshot.forEach(obj=>{
        const video_material = {
          key: obj.id,
          title: obj.data().title,
          file_name: obj.data().file,
          now_playing: false,
        }
        this.state.videos.push(video_material)
        this.state.cp.push(video_material)
      })
      this.state.videos[0].now_playing = true
      this.setState({loading: false, playing_video:this.state.videos[0]})
    }, err=>alert(err.message))
  }
  onVideoItemPressed = (item)=>{
    // alert(item.key)
    this.setState({playing_video: item, loading: true})
    this.state.videos.forEach(video=>{
      if(video.key == item.key){
        video.now_playing = true
      } else{
        video.now_playing = false
      }
    })
    this.setState({loading: false})
  }
  onSearchTextChanged = (text)=>{
    const new_array = this.state.cp.filter(video=>{
      // alert(course.title+"vs"+text)
      return video.title.toLowerCase().includes(text.toLowerCase())
    })
    if(text == null || text == undefined || text == ""){
      this.setState({videos: this.state.cp})
      return;
    }
    this.setState({videos: new_array})
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
        <SearchInput placeholder="Search Videos" onTextChanged={this.onSearchTextChanged} onSubmit={Keyboard.dismiss}/>
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 30,
            backgroundColor: "#00f",
            alignItems: "center",
          }}
        >
          <VideoPlayer
            // playIcon={<Image source={require("./assets/btn_play.png")}/>}
            videoProps={{
              shouldPlay: true,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              // source: { localUri: "H:/Users/Roy/Downloads/preacher.mp4" },
              source: {
                uri: this.state.playing_video.file_name
                  // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              },
            }} 
            
            width={350}
            height={150}
            inFullscreen={true}
          />
        </View>
          <Text style={styles.vieo_title}>{this.state.playing_video.title}</Text>
        <FlatList
        data={this.state.videos}
        renderItem={itemData=>(
          <VideoItem video_title={itemData.item.title} now_playing={itemData.item.now_playing} onHandlePress={this.onVideoItemPressed.bind(this, itemData.item)} />
        )}
        />
        {/* <ScrollView style={styles.list_container}>
          <VideoItem video_title="Tutorial 1: Introduction to Health and Social Care" now_playing={true} />
          <VideoItem video_title="Tutorial 1: Introduction to Health and Social Care" now_playing={false} time="20 Min" />
        </ScrollView> */}
        {this.state.loading?<AmbaIndicator />:null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  vieo_title:{
    fontSize: 15,
    alignSelf: "center",
    marginTop: 5,
    fontWeight: "bold"
  },
  list_container:{
    marginTop:10,
    height:"100%",
    width:"100%",
    padding:15,
    backgroundColor:"#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
});
