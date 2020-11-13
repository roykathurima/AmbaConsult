import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity } from "react-native";
import LogoText from "../components/logo_text";
import PurchasedEBookItem from "../components/purchased_ebook_item";
import * as FileSystem from "expo-file-system"
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

export default class DownloadEBook extends Component {
  // The PurchasedEBookItem element should take its own styles
  constructor(props){
    super(props);
    this.state={
      progress:0,
      book_title: "",
      author:"",
      url:'',
    }
  }
  componentDidMount(){
    const {book_title, author, book_file} = this.props.route.params
    this.setState({book_title: book_title, author: author, url: book_file})
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  onDownloadPressed = ()=>{
    WebBrowser.openBrowserAsync(this.state.url)
    // alert(this.state.progress)
    // FileSystem.downloadAsync(
    //   this.state.url,
    //   FileSystem.documentDirectory + 'credits.pdf',
    //   {},
    //   )
    //   .then(({uri})=>{
    //     WebBrowser.openBrowserAsync(this.state.url)
    //     .catch(err=>alert(err.message))
    //     // Linking.canOpenURL(uri)
    //     // .then(supported => {
    //     //   alert('supported: '+supported )
    //     //   if (supported) {
    //     //     Linking.openURL(uri)
    //     //     .catch(err=>alert(err.message))
    //     //   }
    //     //   else {
    //     //     console.log('File not supported…');
    //     //   }
    //     // })
    //     // .catch(err=>alert(err.message))
    //     // alert(uri)
    //     // Sharing.shareAsync(uri,
    //     //   {mimeType:"application/pdf"}
    //     //   )
          
    //     // Permissions.askAsync(Permissions.CAMERA_ROLL)
    //     // .then(({status})=>{
    //     //   if(status == 'granted'){
    //     //     MediaLibrary.createAssetAsync(uri)
    //     //     .then(asset=>{
    //     //       MediaLibrary.createAlbumAsync("Download", asset, false)
    //     //       .then(()=>console.log("successfully downloaded into deownloads"))
    //     //     })
    //     //     .catch(err=>alert(err.message))
    //     //   }
    //     // })
    //     // .catch(err=>alert(err.message))
    //   })
    //   .catch(err=>alert("problem: "+err.message))
  }
  // getProgess = downloadProgress => {
  //   const _progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
  //   this.setState({
  //     progress: _progress,
  //   });
  // };
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.back_logo}>
          <TouchableOpacity onPress={this.onBackPressed}>
          <Image source={require("../assets/back.png")} />
          </TouchableOpacity>
          <View style={styles.logo}>
            <Image source={require("../assets/logo.png")} />
            <LogoText />
          </View>
        </View>
        <ImageBackground
          style={{
            height: 328,
            width: 383,
            position: "absolute",
            bottom: -150,
            right: -150,
          }}
          source={require("../assets/elipse_decor.png")}
        />
        <View style={styles.image_stylez}>
          <Image source={require("../assets/big_ebooks.png")} />
        </View>
        <PurchasedEBookItem
          book_title={this.state.book_title}
          author={this.state.author}
          style={styles.card}
          onHandlePress={this.onDownloadPressed}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  back_logo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8DBA76",
    padding: 20,
    borderBottomRightRadius: 60,
  },
  logo: {
    marginTop: "2%",
    marginStart: "25%",
  },
  image_stylez: {
    alignItems: "center",
    marginTop: 50,
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
