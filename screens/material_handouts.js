import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import HandoutItem from "../components/handout_item";
export default function MaterialHandouts() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <HandoutItem
          style={styles.card}
          course_name="Lecture 1: Introduction to Health and Social Care"
        />
        <HandoutItem
          style={styles.card}
          course_name="Lecture 2: Introduction to Health and Social Care"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  card: {
    marginTop: 30,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
