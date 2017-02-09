/* eslint-disable max-len */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MultiChoice from './content/multichoice';
import MultiPicture from './content/multipicture';
import MultiSelect from './content/multiselect';
import { questionList } from './actions/questionlist';
import { postAnswerGetQuestion } from './actions/questionque';
import { startInstruction } from './actions/instruction';
import { startProgress } from './actions/progress';
import Spinner from './content/Spinner';

class SurveyProvider extends React.Component {
  componentWillMount() {
    // uncomment line 30 to save answers
    // you can find your answers saved under state.questionque -> answers
    //this.props.dispatch(saveAnswers());
    this.props.dispatch(startInstruction(this.props.instructions))
  }
  componentDidMount() {
    this.buildInitial();
  }
  buildInitial = () => {
    this.props.dispatch(questionList());
  }
  fetchNextQuestion = (response, answer) => {
    const props = this.props;
    // Disabled to allow for empty responses by users
    // if (!response.choiceId) {
    //   console.log(response, 'had no choice id');
    // } else {
      if (!response.questionId) {
        console.log(response, 'had no question id');
      } else {
        props.dispatch(postAnswerGetQuestion(response));
      }
    // }
  };
  handlePictureChoices(currentQuestion) {
    if(currentQuestion.type === "survey-multi-picture") {
      return currentQuestion.choices.map(currentChoice => {
        return {
          url: currentChoice.imageUrl,
          label: currentChoice.displayText,
          choiceId: currentChoice.id
        };
      });
    }
    return currentQuestion.choices.map(currentChoice => {
      return currentChoice.displayText;
    })
  }
  dispatchPrecent = (numberOfQuestions) => {
    const precent = 100 / numberOfQuestions;
    // this.props.dispatch(startProgress((parseFloat(this.props.options.precent, 10)) + precent))
  }
  render() {

    if (this.props.questionque.isFetching) {
      return null;
    }
    if (this.props.questionque.isFetching && !this.props.questionque.current) {
      return <h3>Loading ... </h3>;
    }
    if(this.props.questionque.current) {
    const choices = this.handlePictureChoices(this.props.questionque.current);
    switch (this.props.questionque.current.type) {
      case "survey-multi-picture" : {
        return (
          <div>
            <MultiPicture
              question={this.props.questionque.current.prompt}
              choices={choices}
              showProgress={false}
              dispatchPrecent={this.dispatchPrecent}
              questionId={this.props.questionque.current.choices[0].questionId}
              trialId={this.props.questionque.current.trialId}
              nextQuestion={this.fetchNextQuestion}
              progress={this.props.progress}
              userId={this.props.userInfo.id}
            />
          </div>
        );
      }
      case "survey-multi-choice" : {
        return (
          <div>
            <MultiChoice
              question={this.props.questionque.current.prompt}
              choices={choices}
              showProgress={false}
              dispatchPrecent={this.dispatchPrecent}
              allChoices = {this.props.questionque.current.choices}
              questionId={this.props.questionque.current.choices[0].questionId}
              trialId={this.props.questionque.current.trialId}
              nextQuestion={this.fetchNextQuestion}
              progress={this.props.progress}
              userId={this.props.userInfo.id}
            />
          </div>
        );
      }
      case "survey-multi-select" : {
        return (
          <div>
            <MultiSelect
              question={this.props.questionque.current.prompt}
              choices={choices}
              showProgress={false}
              dispatchPrecent={this.dispatchPrecent}
              allChoices={this.props.questionque.current.choices}
              questionId={this.props.questionque.current.choices[0].questionId}
              trialId={this.props.questionque.current.trialId}
              nextQuestion={this.fetchNextQuestion}
              progress={this.props.progress}
              userId={this.props.userInfo.id}
            />
          </div>
        );
      }
      default:
        return null;
    }
  }
    if (!this.props.questionque.current && !this.props.questionque.isFetching && this.props.userInfo.results) {
      return (
        <div>
        {this.props.resultsContainer(this.props.userInfo.results)}
        </div>
      );
    }
    return <h1>here</h1>;
  }
}
export default connect(state => state.pushkin)(SurveyProvider);
