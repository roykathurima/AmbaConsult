import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import CheckAnswer from "../components/check_answers";
import firebase from "firebase";
import 'firebase/firestore';
import FirebaseConfig from "../constants/api_keys"
import AmbaIndicator from "../components/amba_indicator"

export default class MultipleChoiceQuestion extends Component {
  constructor(props){
    super(props)
    this.state= {
      minutes: 5,
      seconds: 30,
      time_timer:undefined,
      questions: [],
      // {quiz_no, exam_id, quiz_txt, quiz_type, no_of_marks, id}
      current_question: {
        quiz_no:'', exam_id:'', quiz_txt:'', quiz_type:'', no_of_marks:'', id:''
      },
      loading: false,
      choices: [],
      current_index: 0,
      selected_text: '',
      check: false,
      user:{name:'', id:''},
    }
  }
  async componentDidMount(){
    // You can also check if the question has been answered by the student before moving on
    const [student_name, user_id] = await AsyncStorage.multiGet(['student_name', 'user_id'])
    // alert(student_name[1] + '' + user_id[1] + '')
    this.setState({user:{name: student_name[1], id: user_id[1]}})
    // alert(this.state.user.name)
    const {questions, choices} = this.props.route.params
    console.log(questions)
    if(questions == undefined) return
    this.setState({choices: choices, current_question: questions.pop(), questions: questions})
    console.log(this.state.current_question)
    const t = setInterval(()=>{
      if(this.state.seconds == 0 && this.state.minutes == 0){
        clearInterval(this.state.time_timer)
        // auto-navigate to the next screen
        // this.props.navigation.navigate("prose_question")
        this.performNavigation()
        return
      }
      if(this.state.seconds == 0){
        this.setState({minutes: --this.state.minutes, seconds: 60})
        return
      }
      this.setState({seconds: --this.state.seconds})
    }, 1000)
    this.setState({time_timer: t})
  }
  performNavigation = ()=>{
    // If there are no more questions, navigate to the exams screen
    if(this.state.questions.length<=0){
      this.props.navigation.navigate('exams',{finished:true})
      return
    }
    // this.props.navigation.navigate("prose_question")
    const question = this.state.questions[this.state.questions.length-1]
    if(question.quiz_type == 'mc_question'){
      firebase.firestore().collection('multiple_choices').where('question_id', '==', question.id).get()
      .then(snapshot=>{
        const choices = []
        choices.push(snapshot.docs[0].data().choice1)
        choices.push(snapshot.docs[0].data().choice2)
        choices.push(snapshot.docs[0].data().choice3)
        choices.push(snapshot.docs[0].data().choice4)
        this.props.navigation.navigate("multiple_choice_question", {questions: this.state.questions, choices: choices})
      })
    } else if(question.quiz_type == 'boolean'){
      this.props.navigation.navigate("boolean_question", {questions: this.state.questions})
    } else if(question.quiz_type == 'prose'){
      this.props.navigation.navigate("prose_question", {questions: this.state.questions})
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
        if(this.state.selected_text == ''){
          alert('Please provide an answer before moving on to the next question')
          return
        }
        // If you have run out of questions
        // Save the answer into the database
        const quiz = this.state.current_question
        const answer = {
          assigned_mark: '',
          exam_id: quiz.exam_id,
          marked: false,
          possible_mark: quiz.no_of_marks,
          provided_answer: this.state.selected_text,
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
  toggleCheckedHandler = (params)=>{
    // alert(`current selection: ${params.choice}`)
    this.setState({current_index: params.index, selected_text:params.choice, check:true})
  }
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    clearInterval(this.state.time_timer)
    this.setState = (state,callback)=>{
        return;
    };
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
        {this.state.choices.map((choice, index)=>{
          return (
            <CheckAnswer key={index} checked={this.state.current_index==index&&this.state.check?true:false} toggleChecked={this.toggleCheckedHandler.bind(this, {choice:choice, index:index})} choice={choice} />
          )
        })}
        
        <TouchableOpacity style={styles.next_container} onPress={this.onNextPressed}>
          {this.state.questions.length>0?<Text style={styles.next}>Next</Text>:<Text style={styles.next}>Finish</Text>}
          <Image source={require("../assets/arrow.png")} />
        </TouchableOpacity>
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
