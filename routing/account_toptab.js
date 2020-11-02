import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AccountProfile from "../screens/account_profile"
import MyActivities from "../screens/my_activities"
import AccountHeadBanner from "../components/ac_head_banner"

const TopTabs = createMaterialTopTabNavigator();

export default function AccountTopTabNav() {
  return (
      <View style={styles.container}>
          <StatusBar style="auto" />
          <AccountHeadBanner title="Account"/>
          <View style={{marginTop:20, flex:1}}>
      <TopTabs.Navigator
      tabBarOptions={{activeTintColor:"#5C738B", inactiveTintColor: "#598D7D", indicatorStyle:{backgroundColor:"#BBDAAA", top:0, height:null}}}
      >
        <TopTabs.Screen name="account_profile" component={AccountProfile} options={{ title: "Profile" }} />
        <TopTabs.Screen
          name="my_activities"
          component={MyActivities}
          options={{ title: "My Activities" }}
        />
      </TopTabs.Navigator>
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
  