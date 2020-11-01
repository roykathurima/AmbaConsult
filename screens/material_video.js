import React, { Component } from "react";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import VideoItem from "../components/video_item";
export default class MaterialVideo extends Component {
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
                uri:
                  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              },
            }}
            width={350}
            height={150}
            inFullscreen={true}
          />
        </View>
        <Text style={styles.vieo_title}>Tutorial 1: Introduction to Health and Social Care</Text>
        <ScrollView style={styles.list_container}>
          <VideoItem video_title="Tutorial 1: Introduction to Health and Social Care" now_playing={true} />
          <VideoItem video_title="Tutorial 1: Introduction to Health and Social Care" now_playing={false} time="20 Min" />
        </ScrollView>
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
