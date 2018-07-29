import namor from "namor";

import { GET_TRANSLATIONS_FULFILLED } from '../constants/actionTypes';

export let getTranslations = (lang) => {
  return (dispatch) => {
    let response = require(`../translates/${lang}.json`)

    dispatch({ type: GET_TRANSLATIONS_FULFILLED, payload: response });
  };
};

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    type: namor.generate({ words: 1, numbers: 0 }),
    name: namor.generate({ words: 1, numbers: 0 }),
    serial: Math.floor(Math.random() * 30),
    cocom: namor.generate({ words: 1, numbers: 0 }),
    unit: Math.floor(Math.random() * 100),
    location: Math.floor(Math.random() * 100),
    view: 'view',
    date:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

export function makeData(len = 100) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}
