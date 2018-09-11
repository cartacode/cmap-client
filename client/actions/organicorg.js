import axios from 'axios';
import qs from 'qs';

import { ORGANIC_ORG__FETCH, ORGANIC_ORG__ADD, DEPLOYED_ORG__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function fetchOrganicOrg(id) {
  return createAction({
    type: ORGANIC_ORG__FETCH,
    action: () => axios.get(`${baseUrl}/CommandStructure/GetCommandStructureByBranch?branchID=${id}`, requestHeaders),
  });
}

export function fetchDeployedOrg(id) {
  return createAction({
    type: DEPLOYED_ORG__FETCH,
    action: () => axios.get(`${baseUrl}/CommandStructure/GetCommandStructureByBranch?branchID=${id}&CommandRelationship=4`, requestHeaders),
  });
}

export function addOraganicOrg(org) {
  return createAction({
    type: ORGANIC_ORG__ADD,
    action: () => axios.post(`${baseUrl}/Units/PostUnits`, qs.stringify(org), requestHeaders),
  });
}
