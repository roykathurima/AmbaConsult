import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import HomeCoursesList from "../screens/home_courses"
import CourseDetails from "../screens/course_details"
import Payment from "../screens/payment"

const CStack = createStackNavigator();
export default function CoursesStack() {
  return (
      <CStack.Navigator>
        <CStack.Screen name="home_courses" component={HomeCoursesList} options={{ header: () => null }} />
        <CStack.Screen name="course_detail" component={CourseDetails} options={{ header: () => null }} />
        <CStack.Screen name="payment" component={Payment} options={{ header: () => null }} />
      </CStack.Navigator>
  );
}
