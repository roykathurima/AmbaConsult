import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import HomeEBooks from "../screens/home_ebook"
import DownloadEBook from "../screens/download_ebook"
import Payment from "../screens/payment"

const EStack = createStackNavigator();
export default function EBookStack() {
  return (
      <EStack.Navigator>
        <EStack.Screen name="home_ebooks" component={HomeEBooks} options={{ header: () => null }} />
        <EStack.Screen name="download_ebook" component={DownloadEBook} options={{ header: () => null }} />
        <EStack.Screen name="payment" component={Payment} options={{ header: () => null }} />
      </EStack.Navigator>
  );
}
