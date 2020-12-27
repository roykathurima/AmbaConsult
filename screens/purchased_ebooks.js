import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, FlatList, ImageBackground } from "react-native";
import SecondarySkeleton from "../components/secondary_skeleton";
import PurchasedEBookItem from "../components/purchased_ebook_item";
import firebase from "firebase";
import FirebaseConfig from "../constants/api_keys"
import 'firebase/firestore';
import 'firebase/storage';
import AmbaIndicator from "../components/amba_indicator"
import AsyncStorage from '@react-native-community/async-storage';
import * as WebBrowser from 'expo-web-browser';

export default class PurchasedEBooks extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: false,
      books: [],
    }
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  componentDidMount(){
    this.setState({loading: true})
    AsyncStorage.getItem('user_id', null)
    .then(id=>{
      firebase.firestore().collection('my_books').where('student', '==', id).get()
      .then(snapshot=>{
        // console.log(snapshot.docs[0])
        snapshot.docs[0].data().books.forEach(book=>{
          firebase.firestore().collection('e_books').doc(book).get()
          .then(snap=>{
            if(snap.data()){
              const item ={
                key: snap.id,
                book_title: snap.data().book_title,
                author: snap.data().author,
                file: snap.data().book_file,
              }
              this.state.books.push(item)
              this.setState({loading:false})
            }
          })
          .catch(err=>alert(err.message))
        })
      })
      .catch(err=>alert(err.message))
    })
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  onDownloadPressed = (uri)=>{
    WebBrowser.openBrowserAsync(uri)
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SecondarySkeleton
          title="My Books"
          main_styles={styles.main_stylez}
          title_styles={styles.courses}
          calendar_visible={false}
          nav={this.onBackPressed}
        >
          <ImageBackground
            style={{
              height: 328,
              width: 383,
              position: "absolute",
              bottom: 50,
              right: -150,
            }}
            source={require("../assets/elipse_decor.png")}
          />
          <FlatList
          data={this.state.books}
          renderItem={itemData=>(
            <PurchasedEBookItem
              book_title={itemData.item.book_title}
              author={itemData.item.author}
              onHandlePress={this.onDownloadPressed.bind(this, itemData.item.file)}
            />
          )}
          />
          {/* <ScrollView style={{ marginBottom: 210 }}>
            <PurchasedEBookItem
              book_title="Introduction to Health and Social Care"
              author="Richard Newmann"
            />
            <PurchasedEBookItem
              book_title="Introduction to Health and Social Care"
              author="Richard Newmann"
            />
          </ScrollView> */}
        </SecondarySkeleton>
        {this.state.loading?<AmbaIndicator/>:null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingTop: 10,
  },
  main_stylez: {
    marginTop: 10,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 15,
  },
  courses: {
    fontSize: 18,
    fontWeight: "bold",
    marginStart: 10,
    color: "#5C738B",
  },
  main_text: {
    flexWrap: "wrap",
    margin: 10,
    fontSize: 15,
  },
});
