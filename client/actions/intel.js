import axios from 'axios';
import qs from 'qs';

import { INTEL_EEI__ADD, INTEL_REQUEST__ADD, INTEL_EEI__FETCH, INTEL_REQUEST__FETCH, INTEL_REQUEST__FETCH_ONE, INTEL_REQUEST__UPDATE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addIntelEei(intelEei) {
  return createAction({
    type: INTEL_EEI__ADD,
    action: () => axios.post(`${baseUrl}/IntelReqEEI`, qs.stringify(intelEei), requestHeaders),
  });
}

export function addIntelRequest(intelRequest) {
  return createAction({
    type: INTEL_REQUEST__ADD,
    action: () => axios.post(`${baseUrl}/IntelRequest/PostIntelRequest`, qs.stringify(intelRequest), requestHeaders),
  });
}

export function updateIntelRequest(id,intelRequest) {
  return createAction({
    type: INTEL_REQUEST__UPDATE,
    action: () => axios.put(`${baseUrl}/IntelRequest/PutIntelRequest/${id}`, qs.stringify(intelRequest), requestHeaders),
  });
}

export function fetchIntelRequestById(id) {
  return createAction({
    type: INTEL_REQUEST__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequest/${id}`, requestHeaders),
  });
}

export function fetchIntelRequests() {
  return createAction({
    type: INTEL_REQUEST__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequestData`, requestHeaders),
  });
}

export function fetchIntelEEI() {
  return createAction({
    type: INTEL_EEI__FETCH,
    action: () => axios.get(`${baseUrl}/IntelReqEEI`, requestHeaders),
  });
}


