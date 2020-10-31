import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import WorkshopItem from "../components/workshop_item";
export default function MyActivities() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ marginTop: 30 }}>
        <WorkshopItem title="Enrolled Courses" />
        <WorkshopItem title="My Books" />
        <WorkshopItem title="Enrolled Workshops" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
