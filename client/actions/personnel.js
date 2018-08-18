import axios from 'axios';
import qs from 'qs';

import { PERSONNEL__ADD, PERSONNEL__FETCH, PERSONNEL__FETCH_ONE, PERSONNEL__UPDATE, PERSONNEL__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPersonnel(personnel) {
  return createAction({
    type: PERSONNEL__ADD,
    action: () => axios.post(`${baseUrl}/Personnel`, personnel, formDataRequestHeader),
  });
}

export function updatePersonnel(id, data) {
  return createAction({
    type: PERSONNEL__UPDATE,
    action: () => axios.put(`${baseUrl}/Personnel/PutPersonnel/${id}`, data, formDataRequestHeader),
  });
}

export function fetchPersonnels() {
  return createAction({
    type: PERSONNEL__FETCH,
    action: () => axios.get(`${baseUrl}/Personnel/GetPersonnelData`, requestHeaders),
  });
}

export function fetchPersonnelById(id) {
  return createAction({
    type: PERSONNEL__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/Personnel/GetPersonnel/${id}`, requestHeaders),
  });
}

export function deletePersonnelById(id) {
  return createAction({
    type: PERSONNEL__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/Personnel/DeletePersonnel/${id}`, requestHeaders),
  });
}
