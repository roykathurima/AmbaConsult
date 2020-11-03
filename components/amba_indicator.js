import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

export default function AmbaIndicator() {
  return (
    <ActivityIndicator
    //visibility of Overlay Loading Spinner
    style={styles.indicator}
    size="large"
    color="green"
    visible={false}
    //Text with the Spinner
    textContent={'Spinning...'}
    //Text style of the Spinner Text
    textStyle={styles.spinnerTextStyle}
  />
  );
}

const styles = StyleSheet.create({
    indicator: {
      alignSelf:"center", 
      marginTop:30, backgroundColor:"white", 
      position: 'absolute', 
      opacity:0.6,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
});
