import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import HomeWorkshops from "../screens/home_workshops"
import WorkshopsCalendar from "../screens/workshops_calendar"
import WorkshopDetails from "../screens/workshop_details"
import Payment from "../screens/payment"

const WStack = createStackNavigator();
export default function WorkshopStack() {
  return (
      <WStack.Navigator>
        <WStack.Screen name="home_workshops" component={HomeWorkshops} options={{ header: () => null }} />
        <WStack.Screen name="workshop_calendar" component={WorkshopsCalendar} options={{ header: () => null }} />
        <WStack.Screen name="workshop_details" component={WorkshopDetails} options={{ header: () => null }} />
        <WStack.Screen name="payment" component={Payment} options={{ header: () => null }} />
      </WStack.Navigator>
  );
}
