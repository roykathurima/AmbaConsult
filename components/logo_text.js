import React from "react";
import { StyleSheet, Text } from "react-native";

export default function LogoText() {
  return <Text style={styles.logo_text}>Amba Consult</Text>;
}

const styles = StyleSheet.create({
  logo_text: {
    fontSize: 20,
    fontWeight: "bold",
    marginStart: 10,
  },
});
