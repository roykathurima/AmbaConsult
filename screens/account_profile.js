import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import AmbaInput from "../components/amba_input";
import CountryInput from "../components/country";
import GreenButton from "../components/button";
import * as ImagePicker from 'expo-image-picker';
import firebase from "firebase";
import FirebaseConfig from "../constants/api_keys"
import 'firebase/firestore';
import 'firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';

export default class AccountProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id:"",
      image_uri: undefined,
      img: false,
      first_name:"",
      last_name: "",
      email: "",
      country: "",
      input_dirty: false
    }
    if(!firebase.apps.length){
      firebase.initializeApp(FirebaseConfig);
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('user_id', null)
    .then(id=>{
      // Use the ID to get the firebase credentials
      this.setState({user_id: id})
      firebase.firestore().collection('users').doc(id).get()
      .then(docRef=>{
        // alert(docRef.data().email)
        const {first_name, last_name, email, country_name} = docRef.data()
        this.setState({first_name: first_name, last_name: last_name, email: email, country:country_name})
      })
    })
  }
  onEditPressed = ()=>{
    // Change the inputs' state to enabled; the button as well
    // Change the inputs to dirty so as to trigger an update on firebase
    alert("editing some shit...")
  }
  onImagePressed = async ()=>{
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          return;
        }
      }
    })();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
      // Send the image to firebase
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', result.uri, true);
        xhr.send(null);
      });
    firebase.storage().ref('dps').child(`${this.state.user_id}.png`)
    .put(blob)
    .then(snapshot=>{
      console.log(snapshot);
      alert(snapshot)
      blob.close()
    })
    .catch(err=>alert(err.message))
    this.setState({image_uri: result.uri, img: true})
  }
  onSavePressed = ()=>{
    // check if the inputs are dirty first before 
    alert("Handle Save Pressed Roy...")
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <TouchableOpacity onPress={this.onEditPressed}>
        <Image
          style={styles.edit_icon}
          source={require("../assets/edit_icon.png")}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onImagePressed}>
          {this.state.img?
        <Image
          style={{ resizeMode: "cover", ...styles.dp }}
          // source={require("../assets/course_image.png")}
          source={{uri: this.state.image_uri}}
          // uri={this.state.image_uri}
        />: <Image
        style={{ resizeMode: "cover", ...styles.dp }}
        source={require("../assets/course_image.png")}
        // uri={this.state.image_uri}
      />}
        </TouchableOpacity>
        <View style={{ marginHorizontal: 10 }}>
          <AmbaInput placeholder="Mark" />
          <AmbaInput placeholder="Anthony" />
          <AmbaInput placeholder="markanthony2020@gmail.com" />
          <CountryInput placeholder="United Kingdom" />
          <GreenButton text="Save" onHandleClick={this.onSavePressed} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  edit_icon: { marginTop: 30, alignSelf: "flex-end", marginEnd: 30 },
  dp: {
    height: 100,
    width: 100,
    borderRadius: 80,
    alignSelf: "center",
    marginVertical: 10,
  },
});
