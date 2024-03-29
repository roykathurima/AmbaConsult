import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import HomeSkeleton from "../components/home_skeleton";
import WorkshopItem from "../components/workshop_item";

export default class HomeWorkshops extends Component {
  // Loop over all the existing workshops mapping to a workshop Item
  constructor(props){
    super(props);
    this.state={
      loading: false
    }
  }
  onWorkShopItemPressed = (stuff)=>{
    this.props.navigation.navigate("workshop_calendar", {what: stuff});
    // alert(stuff)
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <HomeSkeleton
          title="Workshops"
          img_url={require("../assets/big_workshop.png")}
          image_styles={styles.big_workshop}
          main_styles={styles.main_body}
          title_styles={styles.workshops}
          nav={this.onBackPressed}
        >
          <ScrollView style={{marginBottom: "30%"}}>
            <WorkshopItem onHandlePress={this.onWorkShopItemPressed.bind(this, "Wisdom Lifestyle")} title="Wisdom Lifestyle" />
            <WorkshopItem onHandlePress={this.onWorkShopItemPressed.bind(this, "Altar Serving")} title="Altar Serving" />
            <WorkshopItem onHandlePress={this.onWorkShopItemPressed.bind(this, "Business Startups")} title="Business Startups" />
            <WorkshopItem onHandlePress={this.onWorkShopItemPressed.bind(this, "Mental Health")} title="Mental Health" />
            <WorkshopItem onHandlePress={this.onWorkShopItemPressed.bind(this, "Safeguarding")} title="Safeguarding" />
          </ScrollView>
        </HomeSkeleton>
        {this.state.loading?<AmbaIndicator />:null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  workshops: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginStart: -75,
    // marginEnd: 80,
  },
  big_workshop: {
    alignSelf: "flex-end",
    width: 201,
    height: 216,
  },
  main_body: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    marginTop: -110,
    borderRadius: 40,
    padding: 20,
  },
});
