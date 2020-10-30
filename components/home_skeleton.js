import React from "react";
import { StyleSheet, Text, Image, View, ImageBackground } from "react-native";

export default function HomeSkeleton(props) {
  return (
    <View style={styles.container}>
      <View style={styles.back_logo}>
        <Image source={require("../assets/back.png")} />

        <Text style={props.title_styles}>{props.title}</Text>
        <ImageBackground
          style={props.image_styles}
          source={props.img_url}
        ></ImageBackground>
      </View>
      <View style={(styles.main_body, props.main_styles)}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingTop: 30,
  },
  back_logo: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
