import axios from 'axios';
import qs from 'qs';

import { MUNITION__ADD, MUNITION__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addMunition(munition) {
  return createAction({
    type: MUNITION__ADD,
    action: () => axios.post(`${baseUrl}/Munition`, qs.stringify(munition), requestHeaders),
  });
}

export function fetchMunitions() {
  return createAction({
    type: MUNITION__FETCH,
    action: () => axios.get(`${baseUrl}/Munition/GetMunitionsData`, requestHeaders),
  });
}
