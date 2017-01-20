
import local from './axiosConfigInitial';
import { requestQuestionBegin } from './fetch';
import { error } from './error';

export const CURRENT_QUESTION = 'CURRENT_QUESTION';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const COMPLETE_QUESTION = 'COMPLETE_QUESTION';

export function nextQuestion(nextQuestion) {
  return {
    type: NEXT_QUESTION,
    nextQuestion,
  };
}
export function currentQuestion(currentQuestion) {
  return {
    type: CURRENT_QUESTION,
    currentQuestion,
  };
}
function completeQuestion(completeQuestion) {
  return {
    type: COMPLETE_QUESTION,
    completeQuestion,
  }
}
export function postAnswerGetQuestion(response) {
  return (dispatch, getState) => {
    dispatch(requestQuestionBegin());
    return local.post('response', response)
    .then((resp) => {
      if(resp.error) {
        return dispatch(error(resp.error));
      }
      const state = getState();
      const ql = state.questionlist.data;
      if (!resp.data) {
        dispatch(currentQuestion(null))
        dispatch(nextQuestion(null))
      } else {
        ql.push(resp.data);
      }
      dispatch(nextQuestion(resp.data));
      dispatch(currentQuestion(state.questionque.next));
      dispatch(completeQuestion(state.questionque.current));
    })
    .catch(error => {
      return dispatch(error(error));
    });
  };
}

