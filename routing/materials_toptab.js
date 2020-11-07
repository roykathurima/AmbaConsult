import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialHandouts from "../screens/material_handouts"
import MaterialVideo from "../screens/material_video"
import PlainHeader from "../components/plain_header"
import SearchInput from "../components/search_input";

const TopTabs = createMaterialTopTabNavigator();

export default function MaterialTopTabNav({navigation}) {
  const onBackPressed = ()=>{
    navigation.goBack(null)
  }
  return (
      <View style={styles.container}>
          <StatusBar style="auto" />
          <PlainHeader title="Account" nav={onBackPressed} />
          <SearchInput placeholder="Search Videos" />
          <View style={{marginTop:20, flex:1}}>
      <TopTabs.Navigator
            tabBarOptions={{activeTintColor:"#5C738B", inactiveTintColor: "#598D7D", indicatorStyle:{backgroundColor:"#BBDAAA", top:0, height:null}}}
      >
        <TopTabs.Screen name="material_video" component={MaterialVideo} options={{title: "Video Tutorials"}} />
        <TopTabs.Screen
          name="material_handouts"
          component={MaterialHandouts}
          options={{ title: "Handouts" }}
        />
      </TopTabs.Navigator>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F9F9F9",
      paddingTop:20
    },
  });
  