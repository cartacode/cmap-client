import axios from 'axios';
import qs from 'qs';

import { ORGANIC_PERSONNEL__FETCH, ORGANIC_PERSONNEL__ADD, ORGANIC_PERSONNEL__FETCH_LIST } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function fetchOrganicPersonnel() {
  return createAction({
    type: ORGANIC_PERSONNEL__FETCH,
    action: () => axios.get(`${baseUrl}/CommandStructure/GetCommandStructureByBranch?branchID=1&returnData=PERSONNEL`, requestHeaders),
  });
}

export function addOraganicPersonnel(personnel) {
  return createAction({
    type: ORGANIC_PERSONNEL__ADD,
    action: () => axios.put(`${baseUrl}/Personnel/SetPersonnelUnits`, personnel, requestHeaders),
  });
}

export function fetchPersonnelsByFilter(id) {
    return createAction({
      type: ORGANIC_PERSONNEL__FETCH_LIST,
      action: () => axios.put(`${baseUrl}/Search/SearchPersonnel/`, id, requestHeaders),
    });
  }
