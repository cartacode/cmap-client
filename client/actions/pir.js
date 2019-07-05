import axios from 'axios';
import { PIR__ADD, PIR__UPDATE, PIR__FETCH, PIR__FETCH_ONE, PIR__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPir(pir) {
  return createAction({
    type: PIR__ADD,
    action: () => axios.post(`${baseUrl}/PIR/PostPIR`, JSON.stringify(pir), { headers: requestHeaders }),
  });
}

export function updatePir(id, pir) {  
  return createAction({
    type: PIR__UPDATE,
    action: () => axios.put(`${baseUrl}/PIR/PutPIR/${id}`, JSON.stringify(pir), { headers: requestHeaders }),
  });
}

export function fetchPir() {
  return createAction({
    type: PIR__FETCH,
    action: () => axios.get(`${baseUrl}/PIR/GetPIR`, { headers: requestHeaders }),
  });
}

export function fetchPirById(id) {
  return createAction({
    type: PIR__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/PIR/GetPIR/${id}`, { headers: requestHeaders }),
  });
}

export function deletePirById(id) {
  return createAction({
    type: PIR__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/PIR/DeletePIR/${id}`, { headers: requestHeaders }),
  });
}
