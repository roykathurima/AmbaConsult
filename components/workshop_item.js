import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function WorkshopItem(props) {
  let rand = Math.floor(Math.random() * 2);
  //   rand = 1;

  return (
    <TouchableOpacity style={rand ? styles.touchable : styles.alt_touchable}>
      <ImageBackground
        style={styles.workshop_item}
        source={
          rand
            ? require("../assets/workshop_item.png")
            : require("../assets/workshop_item_alt.png")
        }
      >
        <Text style={styles.item_text}>{props.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  workshop_item: {
    resizeMode: "cover",
    width: "100%",
    // height: "38%",
  },
  item_text: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    // marginTop: 35,
    marginVertical: 37,
  },
  touchable: {
    marginVertical: 10,
    width: "100%",
    marginHorizontal: -10,
    // height: "100%",
  },
  alt_touchable: {
    marginVertical: 10,
    width: "100%",
    marginStart: 5,
    // height: "100%",
  },
});
