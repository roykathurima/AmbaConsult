import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, ImageBackground, Image, View, ProgressBarAndroid } from "react-native";
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
      // this.setState({isLoading: false})
      this.props.navigation.navigate("home");
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
      <ProgressBarAndroid styleAttr="Horizontal" color="#5C738B" progress={1} style={styles.progress}/>
    </ImageBackground>
  );
}
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    marginTop: "40%",
  },
  progress: {
    width: "95%",
    alignSelf: "center",
    marginTop: "90%",
    borderRadius: 10
  }
});
