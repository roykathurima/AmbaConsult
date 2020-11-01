import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, ImageBackground, Text, Image, View } from "react-native";
import LogoText from "../components/logo_text";

export default class Splash extends Component {
  constructor(props){
    super(props)
    this.state ={
      isLoading: true,
    }
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({isLoading: false})
      this.props.navigation.navigate("login");
    }, 3000)
  }
render(){
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/splash_background.png")}
    >
      <StatusBar style="auto" />
      <View style={styles.logo}>
        <Image source={require("../assets/logo.png")} />
        <LogoText />
      </View>
    </ImageBackground>
  );
}
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    marginTop: "40%",
  },
});
