import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import LogoText from "../components/logo_text";
import PurchasedEBookItem from "../components/purchased_ebook_item";

export default function DownloadEBook() {
  // The PurchasedEBookItem element should take its own styles
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.back_logo}>
        <Image source={require("../assets/back.png")} />
        <View style={styles.logo}>
          <Image source={require("../assets/logo.png")} />
          <LogoText />
        </View>
      </View>
      <ImageBackground
        style={{
          height: 328,
          width: 383,
          position: "absolute",
          bottom: -150,
          right: -150,
        }}
        source={require("../assets/elipse_decor.png")}
      />
      <View style={styles.image_stylez}>
        <Image source={require("../assets/big_ebooks.png")} />
      </View>
      <PurchasedEBookItem
        book_title="Introduction to Health and Social Care"
        author="Richard Newmann"
        style={styles.card}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  back_logo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8DBA76",
    padding: 20,
    borderBottomRightRadius: 60,
  },
  logo: {
    marginTop: "2%",
    marginStart: "25%",
  },
  image_stylez: {
    alignItems: "center",
    marginTop: 50,
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
