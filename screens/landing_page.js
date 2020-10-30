import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, Image, View, ImageBackground } from "react-native";
import HomeCard from "../components/home_card";

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        style={styles.callout}
        source={require("../assets/home_callout.png")}
      >
        <Text style={styles.callout_text}>
          Hello,{"\n"}Welcome to Amba Consult
        </Text>
      </ImageBackground>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <HomeCard
          text="Business Consulting"
          img_url={require("../assets/home_bs_consulting.png")}
        />
        <HomeCard
          text="Courses List"
          img_url={require("../assets/home_courses_list.png")}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <HomeCard
          text="Workshops"
          img_url={require("../assets/home_workshops.png")}
        />
        <HomeCard
          text="E-Books"
          img_url={require("../assets/home_ebooks.png")}
        />
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
  callout: {
    width: 298,
    height: 189,
    marginTop: 10,
    paddingTop: 50,
    paddingLeft: 20,
  },
  callout_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5C738B",
  },
});
