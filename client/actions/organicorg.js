import axios from 'axios';
import qs from 'qs';

import { ORGANIC_ORG__FETCH, ORGANIC_ORG__ADD } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function fetchOrganicOrg() {
  return createAction({
    type: ORGANIC_ORG__FETCH,
    action: () => axios.get(`${baseUrl}/CommandStructure/GetCommandStructureByBranch?branchID=1`, requestHeaders),
  });
}

export function addOraganicOrg(org) {
  return createAction({
    type: ORGANIC_ORG__ADD,
    action: () => axios.post(`${baseUrl}/Units/PostUnits`, qs.stringify(org), requestHeaders),
  });
}
