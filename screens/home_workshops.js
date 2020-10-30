import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import HomeSkeleton from "../components/home_skeleton";
import WorkshopItem from "../components/workshop_item";

export default function HomeWorkshops() {
  // Loop over all the existing workshops mapping to a workshop Item
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeSkeleton
        title="Workshops"
        img_url={require("../assets/big_workshop.png")}
        image_styles={styles.big_workshop}
        main_styles={styles.main_body}
        title_styles={styles.workshops}
      >
        <ScrollView>
          <WorkshopItem title="Wisdom Lifestyle" />
          <WorkshopItem title="Alter Serving" />
          <WorkshopItem title="Business Startups" />
          <WorkshopItem title="Mental Health" />
          <WorkshopItem title="Safeguarding" />
        </ScrollView>
      </HomeSkeleton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  workshops: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginStart: -75,
    // marginEnd: 80,
  },
  big_workshop: {
    alignSelf: "flex-end",
    width: 201,
    height: 216,
  },
  main_body: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    marginTop: -110,
    borderRadius: 40,
    padding: 20,
  },
});
