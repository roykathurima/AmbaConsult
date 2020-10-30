import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import HomeSkeleton from "../components/home_skeleton";
import EBookItem from "../components/ebook_item";

export default function HomeEBooks() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeSkeleton
        title="E-Books"
        img_url={require("../assets/big_ebooks.png")}
        image_styles={{ width: 154, height: 132 }}
        main_styles={styles.main_stylez}
        title_styles={styles.ebooks}
      >
        <ScrollView>
          <EBookItem
            book_title="Introduction to Health and Social Care"
            author="Richard Newmann"
            price="$30"
          />
          <EBookItem
            book_title="Introduction to Health and Social Care"
            author="Gary Newmann"
            price="$30"
          />
          <EBookItem
            book_title="Introduction to Health and Social Care"
            author="Richard Newmann"
            price="$50"
          />
        </ScrollView>
      </HomeSkeleton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingTop: 30,
  },
  main_stylez: {
    marginTop: -30,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderRadius: 40,
    padding: 20,
  },
  ebooks: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginStart: -130,
  },
});
