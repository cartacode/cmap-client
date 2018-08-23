import axios from 'axios';
import qs from 'qs';

import { INTEL_EEI__ADD, INTEL_EEI__FETCH, INTEL_EEI__FETCH_ONE, INTEL_EEI__UPDATE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addIntelEei(intelEei) {
  return createAction({
    type: INTEL_EEI__ADD,
    action: () => axios.post(`${baseUrl}/IntelReqEEI/PostIntelReqEEI`, qs.stringify(intelEei), requestHeaders),
  });
}

export function updateIntelEei(id, data) {
  return createAction({
    type: INTEL_EEI__UPDATE,
    action: () => axios.put(`${baseUrl}/IntelReqEEI/PutIntelReqEEI/${id}`, qs.stringify(data), requestHeaders),
  });
}


export function fetchIntelEeiById(id) {
  return createAction({
    type: INTEL_EEI__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/IntelReqEEI/GetIntelReqEEI/${id}`, requestHeaders),
  });
}

export function fetchIntelEeisByIntelId(intelReqId) {
  return createAction({
    type: INTEL_EEI__FETCH,
    action: () => axios.get(`${baseUrl}/IntelReqEEI/GetAllIntelReqEEIByIntelReqId/${intelReqId}`, requestHeaders),
  });
}

export function fetchIntelEEI() {
  return createAction({
    type: INTEL_EEI__FETCH,
    action: () => axios.get(`${baseUrl}/IntelReqEEI/GetIntelReqEEIs`, requestHeaders),
  });
}


