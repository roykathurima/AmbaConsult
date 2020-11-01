import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import BusinessConsulting from "../screens/business_consulting"
import ContactForm from "../screens/contact_form"

const BStack = createStackNavigator();
export default function BusinessStack() {
  return (
      <BStack.Navigator>
        <BStack.Screen name="home_business" component={BusinessConsulting} options={{ header: () => null }} />
        <BStack.Screen name="contact_form" component={ContactForm} options={{ header: () => null }} />
      </BStack.Navigator>
  );
}
