import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import SecondarySkeleton from "../components/secondary_skeleton";
import SearchInput from "../components/search_input";
import CourseItem from "../components/course_item";

export default function EnrolledCourses() {
  // A.K.A Account Enrolled Courses
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SecondarySkeleton
        title="Enrolled Courses"
        main_styles={styles.main_stylez}
        title_styles={styles.courses}
        calendar_visible={false}
      >
        <SearchInput placeholder="Search Courses" />
        <ScrollView style={{ marginBottom: 30, marginTop: 10 }}>
          <CourseItem
            button_title="View Material"
            title="Core Certificate"
            img_url={require("../assets/course_image.png")}
          />
          <CourseItem
            button_title="View Material"
            title="Lifestyle Workshop"
            img_url={require("../assets/course_image1.png")}
          />
          <CourseItem
            button_title="View Material"
            title="Train the Trainer"
            img_url={require("../assets/course_image2.png")}
          />
        </ScrollView>
      </SecondarySkeleton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingTop: 10,
  },
  main_stylez: {
    marginTop: 10,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 15,
  },
  courses: {
    fontSize: 18,
    fontWeight: "bold",
    marginStart: 10,
    color: "#5C738B",
  },
  main_text: {
    flexWrap: "wrap",
    margin: 10,
    fontSize: 15,
  },
});
