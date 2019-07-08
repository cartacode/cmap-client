import axios from 'axios';
import { CCIR__ADD, CCIR__UPDATE, CCIR__FETCH, CCIR__FETCH_ONE, CCIR__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addCcir(ccir) {
  return createAction({
    type: CCIR__ADD,
    action: () => axios.post(`${baseUrl}/CCIRs/PostCCIR`, JSON.stringify(ccir), { headers: requestHeaders }),
  });
}

export function updateCcir(id, ccir) {  
  return createAction({
    type: CCIR__UPDATE,
    action: () => axios.put(`${baseUrl}/CCIRs/PutCCIR/${id}`, JSON.stringify(ccir), { headers: requestHeaders }),
  });
}

export function fetchCcir() {
  return createAction({
    type: CCIR__FETCH,
    action: () => axios.get(`${baseUrl}/CCIRs/GetCCIRs`, { headers: requestHeaders }),
  });
}

export function fetchCcirById(id) {
  return createAction({
    type: CCIR__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/CCIRs/GetCCIR/${id}`, { headers: requestHeaders }),
  });
}

export function deleteCcirById(id) {
  return createAction({
    type: CCIR__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/CCIRs/DeleteCCIR/${id}`, { headers: requestHeaders }),
  });
}
