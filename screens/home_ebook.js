import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, FlatList } from "react-native";
import HomeSkeleton from "../components/home_skeleton";
import EBookItem from "../components/ebook_item";
import firebase from "firebase";
import 'firebase/firestore';
import FirebaseConfig from "../constants/api_keys"
import AmbaIndicator from "../components/amba_indicator"

export default class HomeEBooks extends Component {
  constructor(props){
    super(props);
    this.state={
      ebooks: [],
      loading: false
    }
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  
  onPurchasePressed=()=>{
    this.props.navigation.navigate("payment", {from:"ebooks"});
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  componentDidMount(){
    this.setState({loading: true})
    firebase.firestore().collection('e_books').get()
    .then(snapshot=>{
      snapshot.forEach((obj)=>{
        const e_book = {
          key: obj.id,
          author: obj.data().author,
          book_title: obj.data().book_title,
          price: obj.data().price
        }
        this.state.ebooks.push(e_book)
      })
      this.setState({loading: false})
    })
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <HomeSkeleton
          title="E-Books"
          img_url={require("../assets/big_ebooks.png")}
          image_styles={{ width: 154, height: 132 }}
          main_styles={styles.main_stylez}
          title_styles={styles.ebooks}
          nav={this.onBackPressed}
        >
          <FlatList 
          data={this.state.ebooks}
          renderItem={itemData=>(
            <EBookItem
              book_title={itemData.item.book_title}
              author={itemData.item.author}
              price={`£ ${itemData.item.price}`}
              onHandlePress={this.onPurchasePressed}
            />
          )}
          />
          {/* <ScrollView style={{marginBottom: 120}}>
            <EBookItem
              book_title="Introduction to Health and Social Care"
              author="Richard Newmann"
              price="$30"
              onHandlePress={this.onPurchasePressed}
            />
            <EBookItem
              book_title="Introduction to Health and Social Care"
              author="Gary Newmann"
              price="$30"
              onHandlePress={this.onPurchasePressed}
            />
            <EBookItem
              book_title="Introduction to Health and Social Care"
              author="Richard Newmann"
              price="$50"
              onHandlePress={this.onPurchasePressed}
            />
          </ScrollView> */}
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
    paddingTop: 30,
  },
  main_stylez: {
    marginTop: -30,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 140,
  },
  ebooks: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginStart: -130,
  },
});
