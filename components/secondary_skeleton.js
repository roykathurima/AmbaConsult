import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import LogoText from "./logo_text";
import Calendar from "../components/calendar";

export default function SecondarySkeleton(props) {
  return (
    <View style={styles.container}>
      <View style={styles.back_logo}>
        <TouchableOpacity onPress={props.nav}>
        <Image source={require("../assets/back.png")} />
        </TouchableOpacity>
        <View style={styles.logo}>
          <Image source={require("../assets/logo.png")} />
          <LogoText />
        </View>
      </View>
      <View style={styles.title_calendar}>
        <Text style={props.title_styles}>{props.title}</Text>
        {props.calendar_visible ? <Calendar onHandlePress={props.cal} text={props.cal_text} /> : null}
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
  },
  back_logo: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    justifyContent: "center",
    marginStart: "25%",
  },
  title_calendar: {
    justifyContent: "space-between",
    padding: 5,
    flexDirection: "row",
  },
});
