import React, { Component } from "react";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import VideoItem from "../components/video_item";
import firebase from "firebase";
import 'firebase/firestore';
import FirebaseConfig from "../constants/api_keys"
import AmbaIndicator from "../components/amba_indicator"

export default class MaterialVideo extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: false,
      videos: [],
      playing_video: undefined,
    }
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  componentDidMount(){
    this.setState({loading: true})
    firebase.firestore().collection('course_material').where('type', "==", "video").get()
    .then(snapshot=>{
      snapshot.forEach(obj=>{
        const video_material = {
          key: obj.id,
          title: obj.data().title,
          file_name: obj.data().file,
          now_playing: false,
        }
        this.state.videos.push(video_material)
      })
      this.state.videos[0].now_playing = true
      this.setState({loading: false, playing_video:this.state.videos[0].file_name})
    })
  }
  onVideoItemPressed = (item)=>{
    // alert(item.key)
    this.setState({playing_video: item.file_name, loading: true})
    this.state.videos.forEach(video=>{
      if(video.key == item.key){
        video.now_playing = true
      } else{
        video.now_playing = false
      }
    })
    this.setState({loading: false})
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 40,
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
                uri: this.state.playing_video
                  // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              },
            }} 
            
            width={350}
            height={150}
            inFullscreen={true}
          />
        </View>
        <Text style={styles.vieo_title}>Tutorial 1: Introduction to Health and Social Care</Text>
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
