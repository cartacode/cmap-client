import axios from 'axios';
import qs from 'qs';

import { PERSONNEL__ADD, PERSONNEL__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPersonnel(personnel) {
  return createAction({
    type: PERSONNEL__ADD,
    action: () => axios.post(`${baseUrl}/Personnel`, qs.stringify(personnel), requestHeaders),
  });
}

export function fetchPersonnels() {
  return createAction({
    type: PERSONNEL__FETCH,
    action: () => axios.get(`${baseUrl}/Personnel/GetPersonnelData`, requestHeaders),
  });
}
