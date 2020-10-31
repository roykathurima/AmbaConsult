import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PlainHeader from "./components/plain_header";
import CheckPayment from "./components/check_payment";
import GreenButton from "./components/button";
import Payment from "./screens/payment";
export default function Exams() {
  return <Payment />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  main_text: {
    fontSize: 18,
  },
});
