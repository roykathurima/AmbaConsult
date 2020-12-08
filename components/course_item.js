import React from "react";
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity } from "react-native";

export default function CourseItem(props) {
  return (
    <View
      style={{
        margin: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: "#000",
        marginVertical: 10,
      }}
    >
      <ImageBackground
        style={{
          height: 200,
          resizeMode: "cover",
          justifyContent: "flex-end",
          paddingTop: 20,
        }}
        source={props.img_url}
      >
        <View
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            width: "100%",
          }}
        >
          <Text style={styles.title_text}>{props.title}</Text>
          <TouchableOpacity onPress={props.onHandlePress}>
          <Text style={styles.view_text}>{props.button_title || "View"}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  view_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8DBA76",
  },
  title_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5C738B",
  },
});
