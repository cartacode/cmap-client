import { GET_TRANSLATIONS_FULFILLED } from '../constants/actionTypes';

export let getTranslations = (lang) => {
  return (dispatch) => {
    let response = require(`../translates/${lang}.json`)

    dispatch({ type: GET_TRANSLATIONS_FULFILLED, payload: response });
  };
};
