import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import Exams from "../screens/exams"
import MultipleChoiceQuestion from "../screens/multiple_choice_question"
import ProseQuestion from "../screens/prose_question"
import BooleanQuestion from "../screens/boolean_question"

const ExamStack = createStackNavigator();
export default function ExamsStack() {
  return (
      <ExamStack.Navigator>
        <ExamStack.Screen name="exams" component={Exams} options={{ header: () => null }} />
        <ExamStack.Screen name="multiple_choice_question" component={MultipleChoiceQuestion} options={{ header: () => null }} />
        <ExamStack.Screen name="prose_question" component={ProseQuestion} options={{ header: () => null }} />
        <ExamStack.Screen name="boolean_question" component={BooleanQuestion} options={{ header: () => null }} />
      </ExamStack.Navigator>
  );
}
