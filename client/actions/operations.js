import axios from 'axios';
import qs from 'qs';

import { OPERATION__ADD, OPERATION__UPDATE, OPERATION__FETCH , OPERATION__FETCH_ONE, OPERATION__DELETE_ONE} from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';

export function addOperation(operation) {
  return createAction({
    type: OPERATION__ADD,
    action: () => axios.post(`${baseUrl}/Operations/PostOperations`, operation, { headers: requestHeaders }),
  });
}

export function updateOperation(id, data) {
  return createAction({
    type: OPERATION__UPDATE,
    action: () => axios.put(`${baseUrl}/Operation/PutOperation/${id}`, data, { headers: requestHeaders }),
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
    action: () => axios.get(`${baseUrl}/Operation/GetOperation/${id}`, { headers: requestHeaders }),
  });
}

export function deleteOperationById(id) {
  return createAction({
    type: OPERATION__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/Operation/DeleteOperation/${id}`, { headers: requestHeaders }),
  });
}
