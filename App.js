import React from "react";
import {NavigationContainer} from "@react-navigation/native"
import { LogBox } from "react-native";
import {createStackNavigator} from "@react-navigation/stack"
import Splash from "./screens/splash"
import Login from "./screens/login"
import CreateAccount from "./screens/create_account"
import ForgotPassword from "./screens/forgot_password"
import Verify from "./screens/verify"
import ResetPassword from "./screens/reset_password"
import LandingPage from "./screens/landing_page"
import HomeBottomTabNav from "./routing/home_bottomnav"
import ExamsStack from "./routing/exam_stack"
import EnrolledCourses from "./screens/enrolled_courses"
import EnrolledWorkshops from "./screens/enrolled_workshop"
import EnrolledWorkshopDetails from "./screens/enrolled_workshop_details"
import PurchasedEBooks from "./screens/purchased_ebooks";
import MaterialTopTabNav from "./routing/materials_toptab"

LogBox.ignoreAllLogs()
const InitialStack = createStackNavigator();
export default function InitStack() {
  return (
    <NavigationContainer>
      <InitialStack.Navigator>
        <InitialStack.Screen name="splash" component={Splash} options={{ header: () => null }} />
        <InitialStack.Screen name="login" component={Login} options={{ header: () => null }} />
        <InitialStack.Screen name="register" component={CreateAccount} options={{ header: () => null }} />
        <InitialStack.Screen name="forgot_password" component={ForgotPassword} options={{ header: () => null }} />
        <InitialStack.Screen name="verify" component={Verify} options={{ header: () => null }} />
        <InitialStack.Screen name="reset_password" component={ResetPassword} options={{ header: () => null }} />
        <InitialStack.Screen name="home" component={LandingPage} options={{ header: () => null }} />
        <InitialStack.Screen name="home_stack" component={HomeBottomTabNav} options={{ header: () => null }} />
        <InitialStack.Screen name="exam_stack" component={ExamsStack} options={{ header: () => null }} />
        <InitialStack.Screen name="enrolled_courses" component={EnrolledCourses} options={{ header: () => null }} />
        <InitialStack.Screen name="enrolled_workshops" component={EnrolledWorkshops} options={{ header: () => null }} />
        <InitialStack.Screen name="enrolled_wdetails" component={EnrolledWorkshopDetails} options={{ header: () => null }} />
        <InitialStack.Screen name="purchased_ebooks" component={PurchasedEBooks} options={{ header: () => null }} />
        <InitialStack.Screen name="materials" component={MaterialTopTabNav} options={{ header: () => null }} />
      </InitialStack.Navigator>
    </NavigationContainer>
  );
}
