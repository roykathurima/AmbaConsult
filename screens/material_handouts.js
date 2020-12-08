import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, FlatList } from "react-native";
import HandoutItem from "../components/handout_item";
import firebase from "firebase";
import 'firebase/firestore';
import FirebaseConfig from "../constants/api_keys"
import AmbaIndicator from "../components/amba_indicator"
import * as WebBrowser from 'expo-web-browser';
export default class MaterialHandouts extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: false,
      handouts: [],
    }
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  componentDidMount(){
    this.setState({loading: true});
    firebase.firestore().collection('course_material').where('type', '==', 'handout').get()
    .then(snapshot=>{
      snapshot.forEach(handout=>{
        const item = {
          key: handout.id,
          title: handout.data().title,
          file: handout.data().file
        }
        this.state.handouts.push(item)
      })
      this.setState({loading: false})
    })
  }
  onDownloadPressed = (item)=>{
    // alert(item.key)
    this.setState({loading: true});
    WebBrowser.openBrowserAsync(item.file)
    .then(()=>this.setState({loading: false}))
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <FlatList
        data={this.state.handouts}
        renderItem={itemData=>(
          <HandoutItem
            style={styles.card}
            course_name={itemData.item.title}
            onHandlePress={this.onDownloadPressed.bind(this, itemData.item)}
          />
        )}
        />
        {/* <ScrollView>
          <HandoutItem
            style={styles.card}
            course_name="Lecture 1: Introduction to Health and Social Care"
          />
          <HandoutItem
            style={styles.card}
            course_name="Lecture 2: Introduction to Health and Social Care"
          />
        </ScrollView> */}
        {this.state.loading? <AmbaIndicator />:null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  card: {
    marginTop: 30,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
