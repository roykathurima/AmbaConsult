import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import AccountHeadBanner from "../components/ac_head_banner";
import WorkshopItem from "../components/workshop_item";

export default function Reminders() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AccountHeadBanner title="Reminders" />
      <View style={{ marginTop: 30 }}>
        <WorkshopItem title="Exams" />
        <WorkshopItem title="Workshops" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
});
