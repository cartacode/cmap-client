import axios from 'axios';
import qs from 'qs';

import {  OPORD__FETCH, OPORD__FETCH_ONE, OPORD__DELETE_ONE, OPORD__ADD, OPORD__UPDATE } from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';

export function addOpord(opord) {
  return createAction({
    type: OPORD__ADD,
    action: () => axios.post(`${baseUrl}/Opord`, opord, { headers: formDataRequestHeader }),
  });
}

export function updateOpord(id, data) {
  return createAction({
    type: OPORD__UPDATE,
    action: () => axios.put(`${baseUrl}/Opord/PutOpord/${id}`, data, { headers: formDataRequestHeader }),
  });
}

export function fetchOpords() {
  return createAction({
    type: OPORD__FETCH,
    action: () => axios.get(`${baseUrl}/Opord/GetOpordList`, { headers: requestHeaders }),
  });
}

export function fetchOpordById(id) {
  return createAction({
    type: OPORD__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/Opord/GetOpord/${id}`, { headers: requestHeaders }),
  });
}

export function deleteOpordById(id) {
  return createAction({
    type: OPORD__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/Opord/DeleteOpord/${id}`, { headers: requestHeaders }),
  });
}
