/* eslint-disable max-len */

import React, { PropTypes } from 'react';

export default class MultiChoice extends React.Component {
  componentDidUpdate() {
    const props = this.props;
    const page_1_questions = [this.props.question];
    const page_1_options = this.props.choices;
    const multi_choice_block = {
      type: 'survey-multi-choice',
      questions: page_1_questions,
      options: [page_1_options],
      required: [true, false],
      on_finish: function(data) {
        const response = JSON.parse(data.responses);
        let choiceId;
        props.allChoices.filter(currentChoice => {
          if(currentChoice.displayText === response.answer){
            choiceId = currentChoice.id;
          }
        })
        const formatResponse = {
          choiceId: choiceId,
          questionId: props.questionId,
          user: {
            id: props.userId,
          },
        };
        props.nextQuestion(formatResponse);
      },
    };
    jsPsych.init({
      display_element: this.refs.main,
      timeline: [multi_choice_block],
      on_finish: function() {
        props.progress();
      },
    });
  }
  componentDidMount() {
    const props = this.props;
    const page_1_questions = [this.props.question];
    const page_1_options = this.props.choices;
    const multi_choice_block = {
      type: 'survey-multi-choice',
      questions: page_1_questions,
      options: [page_1_options],
      required: [true, false],
      on_finish: function(data) {
        const response = JSON.parse(data.responses);
        let choiceId;
        props.allChoices.filter(currentChoice => {
          if(currentChoice.displayText === response.answer){
            choiceId = currentChoice.id;
          }
        })
        const formatResponse = {
          choiceId: choiceId,
          questionId: props.questionId,
          user: {
            id: props.userId,
          },
        };
        props.nextQuestion(formatResponse);
      },
    };
    jsPsych.init({
      display_element: this.refs.main,
      timeline: [multi_choice_block],
      on_finish: function() {
        props.progress();
      },
    });
  }

  render() {
    return (
      <div ref="main">
      </div>
    );
  }
}