import axios from 'axios';
import qs from 'qs';

import { PERSONNEL__ADD, PERSONNEL__FETCH, PERSONNEL__FETCH_ONE, PERSONNEL__UPDATE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPersonnel(personnel) {
  return createAction({
    type: PERSONNEL__ADD,
    action: () => axios.post(`${baseUrl}/Personnel`, qs.stringify(personnel), requestHeaders),
  });
}

export function updatePersonnel(id, data) {
  return createAction({
    type: PERSONNEL__UPDATE,
    action: () => axios.put(`${baseUrl}/Personnel/PutPersonnel/${id}`, qs.stringify(data), requestHeaders),
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
