import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import AmbaInput from "../components/amba_input";
import GreenButton from "../components/button";
import * as ImagePicker from 'expo-image-picker';
import firebase from "firebase";
import FirebaseConfig from "../constants/api_keys"
import 'firebase/firestore';
import 'firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from"@react-native-community/picker"
import AmbaIndicator from "../components/amba_indicator"

export default class AccountProfile extends Component {
  country_api_url = "https://restcountries.eu/rest/v2/all"
  constructor(props){
    super(props);
    this.state = {
      user_id:"",
      img: false,
      first_name:"",
      last_name: "",
      email: "",
      country: "",
      c_code: "",
      can_edit: false,
      country_and_code:[],
      fspic_url:'',
      pic_loading:false,
      loading: false,
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
        const {first_name, last_name, email, country_name, country_code, image_location} = docRef.data()
        this.setState({first_name: first_name, last_name: last_name, email: email, country:country_name, c_code:country_code, fspic_url:image_location})
        this.getCountriesFromAPI()
        if(image_location ==null || image_location ==undefined){
          this.setState({img:false})
        }else{
          this.setState({img:true})
        }
      })
    })
  }
  onEditPressed = ()=>{
    // Change the inputs' state to enabled; the button as well
    // Change the inputs to dirty so as to trigger an update on firebase
    this.setState({can_edit:true})
    // alert("editing some shit...")
  }
  onImagePressed = async ()=>{
    if(!this.state.can_edit){
      alert("Press on the Edit Icon to start Editing...")
      return;
    }
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
        this.setState({pic_loading:true})
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
      // Get the URL and set the state with it...
      snapshot.ref.getDownloadURL().then(url=>{
        console.log(url)
        alert(url)
        this.setState({fspic_url: url, pic_loading:false, img: true})
      })
      blob.close()
    })
    .catch(err=>alert(err.message))
  }
  onSavePressed = ()=>{
    // check if the inputs are dirty first before
    // No need for the check since the button is disabled in the first place
    // update the user details kwa firestore 
    // alert("Handle Save Pressed Roy...")
    if(!img){
      alert("Wait for the image to load...");
      return;
    }
    // If the coast is clear
    this.setState({loading:true})
    firebase.firestore().collection('users').doc(this.state.user_id)
    .update({
      first_name: this.state.first_name.trim(),
      last_name: this.state.last_name.trim(),
      email: this.state.email.trim().toLowerCase(),
      country_code: this.state.country.trim(),
      country_name: this.state.c_code.trim(),
      image_location: this.state.fspic_url,
    })
    .then(()=>{
      this.setState({loading:false, can_edit: false})
      alert("Profile Successfully Updated")
    })
    .catch(err=>alert(err.message))
  }
  getCountriesFromAPI = ()=>{
    return fetch(this.country_api_url)
    .then((response) => response.json())
    .then((json)=> {
      const country_array = Array.from(json)
      let obj = []
      country_array.forEach((value)=>{
        // console.log(value.name + ": " + value.callingCodes[0])
        obj.push({name: value.name, code: value.callingCodes[0]})
        // console.log(value.callingCodes[0])
      })
      this.setState({country_and_code: obj})
    })
    .catch((error)=>{console.log(error)});
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  onLogoutPressed = ()=>{
    firebase.auth().signOut()
    .then(()=>{
      // AsyncStorage.removeItem('user_id')
      AsyncStorage.multiRemove(['user_id', 'course_id', 'student_name'])
      .then(()=>this.props.navigation.navigate('home'))
    })
    .catch(err=>alert(err.message))
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.action_icons}>
        <TouchableOpacity onPress={this.onEditPressed}>
        <Image
          style={styles.edit_icon}
          source={require("../assets/edit_icon.png")}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onLogoutPressed}>
        <Image
          style={styles.edit_icon}
          source={require("../assets/logout.png")}
        />
        </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={this.onImagePressed}>
          <View style={styles.pic_loading_box}>
          {this.state.img?
        <Image
          style={{ resizeMode: "cover", ...styles.dp }}
          // source={require("../assets/course_image.png")}
          source={{uri: this.state.fspic_url}}
        />: <Image
        style={{ resizeMode: "cover", ...styles.dp }}
        source={require("../assets/course_image.png")}
      />}
      {this.state.pic_loading?<AmbaIndicator />:null}
      </View>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 10 }}>
          <AmbaInput value={this.state.first_name} editable={this.state.can_edit} placeholder="Mark" onHandleTextChange={(text)=>{this.setState({first_name:text})}} />
          <AmbaInput value={this.state.last_name} editable={this.state.can_edit} placeholder="Anthony" onHandleTextChange={(text)=>{this.setState({last_name:text})}} />
          <AmbaInput value={this.state.email} editable={this.state.can_edit} placeholder="markanthony2020@gmail.com" onHandleTextChange={(text)=>{this.setState({email:text})}} />
          <View style={styles.combobox}>
          <Picker
          style={{color:"grey"}}
            mode={"dropdown"}
            selectedValue={this.state.country}
            enabled={this.state.can_edit}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({country: itemValue, c_code: itemValue, c_name:this.state.country_and_code[itemIndex-1].name})
            }
          >
            <Picker.Item label={this.state.country} value={this.state.c_code} />
            {this.state.country_and_code.map((country)=>{
              return(<Picker.Item key={country.code} label={country.name} value={country.code} />);
            })}
          </Picker>
        </View>
          <GreenButton disabled={!this.state.can_edit} text="Save" onHandleClick={this.onSavePressed} />
        </View>
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
  edit_icon: { marginTop: 30, alignSelf: "flex-end", marginEnd: 30 },
  dp: {
    height: 100,
    width: 100,
    borderRadius: 80,
    alignSelf: "center",
    marginVertical: 10,
  },
  combobox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 15,
  },
  pic_loading_box: {
    paddingTop:"5%", 
    // paddingBottom:"-20%", 
    paddingBottom:"-60%", 
    width:"25%", 
    alignSelf:"center", 
    borderRadius:80,
    color:"red"
  },
  action_icons:{
    flexDirection: "row",
    justifyContent: "flex-end",
  }
});
