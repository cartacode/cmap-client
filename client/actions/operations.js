import axios from 'axios';
import qs from 'qs';

import { OPERATION__ADD, OPERATION__UPDATE, OPERATION__FETCH , OPERATION__FETCH_ONE, OPERATION__DELETE_ONE} from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';

export function addOperation(personnel) {
  return createAction({
    type: OPERATION__ADD,
    action: () => axios.post(`${baseUrl}/Personnel`, personnel, { headers: formDataRequestHeader }),
  });
}

export function updateOperation(id, data) {
  return createAction({
    type: OPERATION__UPDATE,
    action: () => axios.put(`${baseUrl}/Personnel/PutPersonnel/${id}`, data, { headers: formDataRequestHeader }),
  });
}

export function fetchOperations() {
    console.log("action 23");
  return createAction({
    type: OPERATION__FETCH,
    action: () => axios.get(`${baseUrl}/Personnel/GetPersonnelData`, { headers: requestHeaders }),
  });
}

export function fetchOperationById(id) {
  return createAction({
    type: OPERATION__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/Personnel/GetPersonnel/${id}`, { headers: requestHeaders }),
  });
}

export function deleteOperationById(id) {
  return createAction({
    type: OPERATION__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/Personnel/DeletePersonnel/${id}`, { headers: requestHeaders }),
  });
}
