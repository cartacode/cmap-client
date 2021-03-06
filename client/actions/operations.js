import axios from 'axios';
import qs from 'qs';

import { OPERATION__ADD, OPERATION__UPDATE, OPERATION__FETCH , OPERATION__FETCH_ONE, OPERATION__DELETE_ONE} from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';

export function addOperation(operation) {
  return createAction({
    type: OPERATION__ADD,
    action: () => axios.post(`${baseUrl}/Operations/PostOperations`, operation, { headers: formDataRequestHeader }),
  });
}

export function updateOperation(id, data) {
  return createAction({
    type: OPERATION__UPDATE,
    action: () => axios.put(`${baseUrl}/Operations/PutOperations/${id}`, data, { headers: formDataRequestHeader }),
  });
}

export function fetchOperations() {
  return createAction({
    type: OPERATION__FETCH,
    action: () => axios.get(`${baseUrl}/Operations/GetOperations`, { headers: requestHeaders }),
  });
}

export function fetchOperationById(id) {
  return createAction({
    type: OPERATION__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/Operations/GetOperations/${id}`, { headers: requestHeaders }),
  });
}

export function deleteOperationById(id) {
  return createAction({
    type: OPERATION__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/Operations/DeleteOperations/${id}`, { headers: requestHeaders }),
  });
}
