import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import SecondarySkeleton from "../components/secondary_skeleton";
import EnrolledWorkshopCalendarItem from "../components/enrolled_cal_item";

export default function EnrolledWorkshops() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SecondarySkeleton
        title="Enrolled Workshops Calendar"
        main_styles={styles.main_stylez}
        title_styles={styles.courses}
        calendar_visible={true}
      >
        <ScrollView style={{ marginBottom: 210 }}>
          <EnrolledWorkshopCalendarItem
            title="Introduction to Health and Social Care"
            date="23rd July 2020"
            venue="Heart of England Conference"
          />
          <EnrolledWorkshopCalendarItem
            title="Introduction to Health and Social Care"
            date="23rd September 2020"
            venue="Heart of England Conference"
          />
          <EnrolledWorkshopCalendarItem
            title="Introduction to Health and Social Care"
            date="13th November 2020"
            venue="Heart of England Conference"
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
