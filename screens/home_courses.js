import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import HomeSkeleton from "../components/home_skeleton";
import SearchInput from "../components/search_input";
import CourseItem from "../components/course_item";

export default function HomeCoursesList() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeSkeleton
        title="Courses List"
        img_url={require("../assets/big_courses.png")}
        image_styles={{ width: 171, height: 172 }}
        main_styles={styles.main_stylez}
        title_styles={styles.courses}
      >
        <SearchInput placeholder="Search Courses" />
        <ScrollView style={{ marginBottom: 30, marginTop: 10 }}>
          <CourseItem
            title="Core Certificate"
            img_url={require("../assets/course_image.png")}
          />
          <CourseItem
            title="Lifestyle Workshop"
            img_url={require("../assets/course_image1.png")}
          />
          <CourseItem
            title="Train the Trainer"
            img_url={require("../assets/course_image2.png")}
          />
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