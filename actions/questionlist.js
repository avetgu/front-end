import local from './axiosConfigInitial';
import { error } from './error';

export const USER_ID = 'USER_ID';
export const FETCHING_LIST = 'FETCHING_LIST';
export const BUILD_INITIAL = 'BUILD_INITIAL';

function sendUserId(id) {
  return {
    type: USER_ID,
    id,
  };
}
function fetchingList() {
  return {
    type: FETCHING_LIST,
  };
}
function buildInitial(list) {
  return {
    type: BUILD_INITIAL,
    list,
  }
}
export function questionList() {
  return (dispatch, getState) => {
    dispatch(fetchingList());
    return local.get('initialQuestions')
    .then((resp) => {
      if (resp.error) {
        return dispatch(error(resp.error));
      }
      dispatch(buildInitial(resp.data.questions));
      return resp.data;
    })
    .then((data) => {
      return dispatch(sendUserId(data.user.id));
    })
    .catch((err) => {
      return dispatch(error(err));
    });
  };
}