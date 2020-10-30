import React from "react";
// import React, {useState} from "react";
import { StyleSheet, Image, View, Modal, Text } from "react-native";

export default function PasswordResetSuccess(props) {
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      //   statusBarTranslucent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        // this.visibleModal(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.success_text}>SUCCESS</Text>
          <Image source={require("../assets/check_circle.png")} />
          <Text style={styles.reset_text}>Password Reset</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  success_text: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    color: "#5C738B",
  },
  reset_text: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 18,
    color: "#5C738B",
  },
});
