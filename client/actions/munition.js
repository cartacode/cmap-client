import axios from 'axios';
import qs from 'qs';

import { MUNITION__ADD, MUNITION__UPDATE, MUNITION__FETCH, MUNITION__FETCH_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addMunition(munition) {
  return createAction({
    type: MUNITION__ADD,
    action: () => axios.post(`${baseUrl}/Munition/PostMunition`, qs.stringify(munition), requestHeaders),
  });
}

export function updateMunition(id, munition) {
  return createAction({
    type: MUNITION__UPDATE,
    action: () => axios.put(`${baseUrl}/Munition/PutMunition/${id}`, qs.stringify(munition), requestHeaders),
  });
}

export function fetchMunitions() {
  return createAction({
    type: MUNITION__FETCH,
    action: () => axios.get(`${baseUrl}/Munition/GetMunitionsData`, requestHeaders),
  });
}


export function fetchMunitionsById(id) {
  return createAction({
    type: MUNITION__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/Munition/GetMunition/${id}`, requestHeaders),
  });
}
