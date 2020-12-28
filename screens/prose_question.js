import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from "react-native";
import MultiLineInput from "../components/multiline_input";
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "firebase";
import 'firebase/firestore';
import FirebaseConfig from "../constants/api_keys"
import AmbaIndicator from "../components/amba_indicator"

let count = 0
export default class ProseQuestion extends Component {
  constructor(props){
    super(props)
    this.state = {
      minutes: 5,
      seconds: 0,
      time_timer:undefined,
      questions: [],
      // {quiz_no, exam_id, quiz_txt, quiz_type, no_of_marks, id}
      current_question: {
        quiz_no:'', exam_id:'', quiz_txt:'', quiz_type:'', no_of_marks:'', id:''
      },
      loading: false,
      new_quiz: false,
      answer_text: '',
      user: {user:'', id:''},
    }
  }
  async componentDidMount(){
    const [student_name, user_id] = await AsyncStorage.multiGet(['student_name', 'user_id'])
    // alert(student_name[1] + '' + user_id[1] + '')
    const {questions, minutes, seconds} = this.props.route.params
    this.setState({user:{name: student_name[1], id: user_id[1]}, minutes: minutes, seconds: seconds})
    if(questions == undefined){
      alert("the question is undefined")
      return
    }
    const q_holder = questions.pop()
    this.setState({current_question: q_holder})
    // alert(q_holder.quiz_txt)
    // pop mutates the array
    this.setState({questions: questions})
    console.log(this.state.current_question)
    const t = setInterval(()=>{
      if(this.state.seconds == 0 && this.state.minutes == 0){
        clearInterval(this.state.time_timer)
        // auto-navigate out of the questions when the time is up
        this.props.navigation.navigate('exams',{finished:true})
        return
      }
      if(this.state.seconds == 0){
        firebase.firestore().collection('exams').doc(question.exam_id).update({completed:true})
        .then(()=>{
          this.props.navigation.navigate('exams',{finished:true})
          return
        }, err=>{
          alert(err.message)
          return
        })
      }
      this.setState({seconds: --this.state.seconds})
    }, 1000)
    this.setState({time_timer: t})
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    clearInterval(this.state.time_timer)
    this.setState = (state,callback)=>{
        return;
    };
}

componentDidUpdate(nextProps, nextState){
  // The documentation for this is in the boolean question
  if(nextState.new_quiz && count < 1){
    count =+1
    this.setState({new_quiz:false})
    this.componentDidMount()
  }
}
  performNavigation = ()=>{
    // If there are no more questions, navigate to the exams screen
    if(this.state.questions.length<=0){
      firebase.firestore().collection('exams').doc(this.state.current_question.exam_id).update({completed:true})
      .then(()=>{
        clearInterval(this.state.time_timer)
        this.props.navigation.navigate('exams',{finished:true, exam_id:this.state.current_question.exam_id})
      }, err=>{
        clearInterval(this.state.time_timer)
        alert(err.message)
      })
      return
    }
    const question = this.state.questions[this.state.questions.length-1]
    if(question.quiz_type == 'mc_question'){
      firebase.firestore().collection('multiple_choices').where('question_id', '==', question.id).get()
      .then(snapshot=>{
        const choices = []
        choices.push(snapshot.docs[0].data().choice1)
        choices.push(snapshot.docs[0].data().choice2)
        choices.push(snapshot.docs[0].data().choice3)
        choices.push(snapshot.docs[0].data().choice4)
        this.props.navigation.navigate("multiple_choice_question", {questions: this.state.questions, choices: choices, minutes:this.state.minutes, seconds: this.state.seconds})
      })
    } else if(question.quiz_type == 'boolean'){
      this.props.navigation.navigate("boolean_question", {questions: this.state.questions, minutes:this.state.minutes, seconds: this.state.seconds})
    } else if(question.quiz_type == 'prose'){
      this.setState({new_quiz:true})
      this.props.navigation.navigate("prose_question", {questions: this.state.questions, minutes:this.state.minutes, seconds: this.state.seconds})
    }
    // End of Handler
  }

  onNextPressed = ()=>{
    firebase.firestore().collection('submitted_answers').where('student_id', '==', this.state.user.id).where('question_id', '==', this.state.current_question.id).get()
    .then(snap=>{
      // alert(snap.docs.length +" "+ this.state.user.id + " "+ this.state.current_question.id)
      if(snap.docs.length > 0){
        // alert('you have already answered this question')
        Alert.alert("Attention", "You have already answered this question", [{text:"Ok", onPress:this.performNavigation}],{cancelable:false})
        return
      }
      else if(snap.docs.length == 0){
        // check that an answer has been provided first
        if(this.state.answer_text == '' || this.state.answer_text == undefined || this.state.answer_text == null){
          alert('Please provide an answer before moving on to the next question')
          return
        }
        // If you have run out of questions --> Its sorted out relaaax
        // Save the answer into the database
        const quiz = this.state.current_question
        const answer = {
          assigned_mark: '',
          exam_id: quiz.exam_id,
          marked: false,
          possible_mark: quiz.no_of_marks,
          provided_answer: this.state.answer_text,
          question_no: quiz.quiz_no,
          question_text: quiz.quiz_txt,
          student_id:this.state.user.id,
          student_name:this.state.user.name,
          type: quiz.quiz_type,
          question_id:quiz.id,
        }
        firebase.firestore().collection('submitted_answers').add(answer)
        .then(docRef=>{
          console.log(docRef)
          this.performNavigation()
        }, err=>alert(err.message))
        // End of it
      }
    }, err=>alert(err.messsage))
  }
  
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.back_logo}>
          <Image source={require("../assets/back.png")} />
          <Text style={styles.timer}>{this.state.minutes+":"+this.state.seconds}</Text>
        </View>
        <Text style={styles.question_text}>
          {`Q${this.state.current_question.quiz_no}. ${this.state.current_question.quiz_txt}`}
        </Text>
        <View style={{ marginHorizontal: 20 }}>
          <MultiLineInput
            text_input_styles={{ borderWidth: 1, borderColor: "#707070" }}
            placeholder="Input Your Answer Here..."
            onHandleTextChange={(text)=>{this.setState({answer_text: text})}}
          />
        </View>
        <TouchableOpacity style={styles.next_container} onPress={this.onNextPressed}>
        {this.state.questions.length>0?<Text style={styles.next}>Next</Text>:<Text style={styles.next}>Finish</Text>}
          <Image source={require("../assets/arrow.png")} />
        </TouchableOpacity>
        {this.state.loading?<AmbaIndicator/>:null}
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
  back_logo: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timer: {
    color: "#8DBA76",
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
  },
  question_text: {
    flexWrap: "wrap",
    margin: 20,
    fontSize: 15,
  },
  next: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8DBA76",
    marginEnd: 10,
  },
  next_container: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "50%",
  },
});
