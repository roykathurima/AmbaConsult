import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, ImageBackground, View, FlatList } from "react-native";
import PlainHeader from "../components/plain_header";
import SearchInput from "../components/search_input";
import firebase from "firebase";
import 'firebase/firestore';
import ExamItem from '../components/exam_item'
import FirebaseConfig from "../constants/api_keys"
import AmbaIndicator from "../components/amba_indicator"
export default class Exams extends Component {
  constructor(props){
    super(props)
    this.state = {
      // Exams is an array of exam_questions objects
      exams:[],
      loading: false,
    }
  }
  componentDidMount(){
    // Should return a list of exams for all the courses that the student is enrolled in
    this.setState({loading:true})
    firebase.firestore().collection('exams').get()
    .then(snapshot=>{
      snapshot.forEach(exam=>{
        const exam_questions = []
        const egzam = {
          key:exam.id,
          course_name: exam.data().course_name,
          date: exam.data().date,
          duration: exam.data().duration,
          questions: exam_questions,
        }
        this.state.exams.push(egzam)
        
        firebase.firestore().collection('exam-questions').where('exam_id', '==', exam.id).get()
        .then(snap=>{
          snap.forEach(question=>{
            const quiz = {
              id:question.id,
              exam_id:egzam.key,
              no_of_marks: question.data().no_of_marks,
              quiz_no: question.data().question_no,
              quiz_txt: question.data().question_text,
              quiz_type: question.data().type,
            }
            exam_questions.push(quiz)
          })
          exam_questions.sort((q1, q2)=>{
            if (q1.quiz_no>q2.quiz_no) return 1
            if(q2.quiz_no>q1.quiz_no) return -1
          })
          this.setState({loading:false})
          // console.log(this.state.exams)
        }, err=>{
          this.setState({loading:false})
          alert(err.message)})
      })
    }, err=>{
      this.setState({loading:false})
      alert(err.message)})
  }
  onTakeTestPressed = (item)=>{
    // Check if one has already completed the test
    if(this.props.route.params){
      alert("You have already completed and submitted this test")
      return
    }
    // I am taking a peek, but the popping shall be done in the question component itself
    const question = item.questions[item.questions.length-1]
    if(question.quiz_type == 'mc_question'){
      firebase.firestore().collection('multiple_choices').where('question_id', '==', question.id).get()
      .then(snapshot=>{
        const choices = []
        choices.push(snapshot.docs[0].data().choice1)
        choices.push(snapshot.docs[0].data().choice2)
        choices.push(snapshot.docs[0].data().choice3)
        choices.push(snapshot.docs[0].data().choice4)
        this.props.navigation.navigate("multiple_choice_question", {questions: item.questions, choices: choices})
      })
    } else if(question.quiz_type == 'boolean'){
      this.props.navigation.navigate("boolean_question", {questions: item.questions})
    } else if(question.quiz_type == 'prose'){
      this.props.navigation.navigate("prose_question", {questions: item.questions})
    }
  }
  onBackPressed = ()=>{
    this.props.navigation.goBack(null)
  }
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
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
        <PlainHeader title="Exams Due" nav={this.onBackPressed} />
        <View style={{ marginHorizontal: 10 }}>
          <SearchInput placeholder="Search Exams" />
          <FlatList
          style={{marginBottom: 130}}
          data={this.state.exams}
          renderItem={itemData=>(
            <ExamItem
            course_name ={itemData.item.course_name}
            date = {itemData.item.date}
            duration={`${itemData.item.duration} Hrs`}
            style={styles.card}
            onHandlePress={this.onTakeTestPressed.bind(this, itemData.item)}
            />
          )}
          />
          {/* <ScrollView style={{ marginBottom: 130 }}>
            <ExamItem
              course_name="Intro to Health and Social Care"
              date="23rd July 2020"
              duration="2 Hours"
              style={styles.card}
              onHandlePress={this.onTakeTestPressed}
            />
            <ExamItem
              course_name="Intro to Health and Social Care"
              date="23rd July 2020"
              duration="2 Hours"
              style={styles.card}
              onHandlePress={this.onTakeTestPressed}
            />
          </ScrollView> */}
        </View>
        {this.state.loading?<AmbaIndicator/>:null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
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
