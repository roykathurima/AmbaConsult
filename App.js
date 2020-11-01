import React from "react";
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import Splash from "./screens/splash"
import Login from "./screens/login"
import CreateAccount from "./screens/create_account"
import ForgotPassword from "./screens/forgot_password"
import Verify from "./screens/verify"
import ResetPassword from "./screens/reset_password"
import LandingPage from "./screens/landing_page"
import BusinessStack from "./routing/business_stack"
import CoursesStack from "./routing/courses_stack"
import EBookStack from "./routing/ebook_stack"
import WorkshopStack from "./routing/workshop_stack"

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
        <InitialStack.Screen name="business_stack" component={BusinessStack} options={{ header: () => null }} />
        <InitialStack.Screen name="courses_stack" component={CoursesStack} options={{ header: () => null }} />
        <InitialStack.Screen name="ebook_stack" component={EBookStack} options={{ header: () => null }} />
        <InitialStack.Screen name="workshop_stack" component={WorkshopStack} options={{ header: () => null }} />
      </InitialStack.Navigator>
    </NavigationContainer>
  );
}
