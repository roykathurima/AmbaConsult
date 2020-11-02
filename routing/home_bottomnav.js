import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountTopTabNav from "./account_toptab"
import Reminders from "../screens/reminders"
import BusinessStack from "./business_stack"
import CoursesStack from "./courses_stack"
import EBookStack from "./ebook_stack"
import WorkshopStack from "./workshop_stack";

const Tabs = createBottomTabNavigator();

export default function HomeBottomTabNav({route}) {
  const {intended_screen} = route.params;
  let homeScreen;
  if(intended_screen === "business"){
    homeScreen = BusinessStack
  } else if(intended_screen === "courses"){
    homeScreen = CoursesStack
  } else if(intended_screen === "ebooks"){
    homeScreen = EBookStack
  } else if(intended_screen === "workshops"){
    homeScreen = WorkshopStack
  }
  //  You Can check where you have come from to dynamically determine which home stack to render...
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused, position }) => {
          return focused ? (
            <View>
              <Text style={{ color: "#8DBA76", marginStart: 20 }}>
                {route.name}
              </Text>
            </View>
          ) : null;
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? require("../assets/ic_home_active.png") : require("../assets/ic_home_dis.png");
            return (<Image source={iconName}/>);
          } else if (route.name === "Account") {
            iconName = focused ? require("../assets/ic_account_active.png") : require("../assets/ic-account_dis.png");
          } else if (route.name === "Reminders") {
            iconName = focused ? require("../assets/ic_reminders_active.png") : require("../assets/ic_reminders_dis.png");
            return (<Image source={iconName}/>);
          }
          return (<Image source={iconName}/>);
        },
      })}
      tabBarOptions={{
        activeTintColor: "#8DBA76",
        activeBackgroundColor: "#E6F1E0",
        inactiveBackgroundColor: "#fff",
        tabStyle: { marginVertical: 5, marginHorizontal:5, borderRadius: 30 },
        labelPosition: "beside-icon",
      }}
    >
      <Tabs.Screen name="Home" component={homeScreen} />
      <Tabs.Screen name="Account" component={AccountTopTabNav} />
      <Tabs.Screen
        name="Reminders"
        component={Reminders}
        options={{ tabBarBadge: 2 }}
      />
    </Tabs.Navigator>
  );
}
