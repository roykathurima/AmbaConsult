import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, ImageBackground, View, FlatList, Alert } from "react-native";
import PlainHeader from "../components/plain_header";
import SearchInput from "../components/search_input";
import firebase from "firebase";
import 'firebase/firestore';
import ExamItem from '../components/exam_item'
import AsyncStorage from '@react-native-community/async-storage';
import FirebaseConfig from "../constants/api_keys"
import AmbaIndicator from "../components/amba_indicator"
import AmbaHelpers from "../utils/AmbaHelpers"
export default class Exams extends Component {
  constructor(props){
    super(props)
    this.state = {
      // Exams is an array of exam_questions objects
      exams:[],
      loading: false,
      student_id: ""
    }
  }
  componentDidUpdate(){
    console.log("component updated...")
    // Consider passing the ID of the exam that was completed and have the this lifecycle method loop
    // through the state and then change the state of the button when the user is through...
    // The alternative would be to observe the data but that would change the structure of the code in a major way
  }
  async componentDidMount(){
    // Should return a list of exams for all the courses that the student is enrolled in
    this.setState({loading:true})
    const user_id = await AsyncStorage.getItem('user_id')
    this.setState({student_id: user_id})
    alert(this.state.student_id)
    firebase.firestore().collection('my_courses').where("student","==", this.state.student_id).get()
    .then(shot=>{
      if(shot.docs.length<=0){
        alert("You do not have any exams at the moment")
        return
      }
      shot.docs[0].data().courses.forEach(course=>{
        // 
        firebase.firestore().collection('exams').where("course", "==", course).get()
        .then(snapshot=>{
          snapshot.forEach(exam=>{
            // Check if the exam has been successfully completed
            // undefined should eval to a falsy value
            let completed = false
            if(exam.data().completed){
              completed = true
            }
            const exam_questions = []
            // Perform the calculation for duration...
            const min = exam.data().duration;
            const time_str = AmbaHelpers.getTImeString(min)
            const egzam = {
              key:exam.id,
              course_name: exam.data().course_name,
              date: exam.data().date,
              duration: time_str,
              minutes: min,
              questions: exam_questions,
              completed: completed,
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
                if (q1.quiz_no>q2.quiz_no) return -1
                if(q2.quiz_no>q1.quiz_no) return 1
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
          })
    }, err=>alert(err.message));
  }

  viewResults(item){
    // The item is passed can help with the querying of the results
    // current algorithm... if the first question is marked, it assumes that the entire exam is marked...
    // So maybe enforce the constraint that the admin/trainer should finish the marking prior
    // to doing anything else... alternatively, introduce a new variable which marks an exam as being 
    // completely marked or not
    // ALG=> take the length of questions in the item, compare it to the length of the array returned.
    // if the array length is less than that of the questions means that not all questions have been marked
    firebase.firestore().collection('submitted_answers').where("student_id", "==", this.state.student_id).where("exam_id","==", item.key).where("marked","==", true).get()
    .then(snap=>{
      if(snap.docs.length < item.questions.length){
        alert("The Results for this test are not yet available")
        return
      }
      let total_score = 0
      let total_marks = 0
      snap.forEach(item=>{
        total_score += item.data().assigned_mark
        total_marks += item.data().possible_mark
      })
      Alert.alert("Your Score", `${total_score} / ${total_marks}`, [{text:"Ok"}], {cancelable:false})
    })
    .catch(err=>alert(err.message))
  }
  onTakeTestPressed = (item)=>{
    // Add a consition for when the time is up so that they do not access the test...
    // or maybe maybe set up so that execution takes a different branch
    // Check if one has already completed the test
    // I am taking a peek, but the popping shall be done in the question component itself
    const question = item.questions[item.questions.length-1]
    // The initial algorithm blocked out all the tests, even those that weren't taken
    // if(this.props.route.params || !question){
    //   alert("You have already completed and submitted this test")
    //   return
    // }
    // alert(item.completed)
    if(item.completed){
      // alert("You have already completed and submitted this test and the results are not available...")
      // Call the View Results Method
      this.viewResults(item)
      return
    }

    console.log(question)
    alert(question.quiz_type)
    

    if(question.quiz_type == 'mc_question'){
      firebase.firestore().collection('multiple_choices').where('question_id', '==', question.id).get()
      .then(snapshot=>{
        const choices = []
        choices.push(snapshot.docs[0].data().choice1)
        choices.push(snapshot.docs[0].data().choice2)
        choices.push(snapshot.docs[0].data().choice3)
        choices.push(snapshot.docs[0].data().choice4)
        this.props.navigation.navigate("multiple_choice_question", {questions: item.questions, choices: choices, minutes: item.minutes, seconds: 0})
      })
    } else if(question.quiz_type == 'boolean'){
      this.props.navigation.navigate("boolean_question", {questions: item.questions, minutes: item.minutes, seconds: 0})
    } else if(question.quiz_type == 'prose'){
      this.props.navigation.navigate("prose_question", {questions: item.questions, minutes: item.minutes, seconds: 0})
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
            duration={itemData.item.duration}
            style={styles.card}
            title = {itemData.item.completed?"View Results":"Take Test"}
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
