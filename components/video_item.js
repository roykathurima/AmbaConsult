import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";

export default function VideoItem(props) {
  return (
    <TouchableOpacity style={styles.video_item} onPress={props.onHandlePress}>
    <Image style={styles.thumbnail} source={require("../assets/course_image.png")}/>
    <View style={styles.video_texts}>
  <Text style={styles.video_title}>{props.video_title}</Text>
  {props.now_playing?<Text style={[styles.status_time, styles.now_playing]}>Now Playing...</Text>:<Text style={styles.status_time}>{props.time}</Text>}
    </View>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    video_item:{
        backgroundColor:"#DCE4E2",
        borderRadius:10,
        flexDirection:"row",
        padding:10,
        marginVertical: 10
      },
      video_texts:{
        flexDirection:"column",
        marginStart: 10,
        flexShrink: 1,
      },
      video_title:{
        flexWrap:"wrap",
        color: "#5C738B"
        
      },
      status_time:{
        fontSize: 15,
        marginTop: 10
      },
      thumbnail:{
        width: "30%",
        borderRadius:20,
        height:70
      },
      now_playing:{
          color: "#8DBA76"
      }
});
