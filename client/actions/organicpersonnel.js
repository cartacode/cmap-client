import axios from 'axios';
import qs from 'qs';

import { ORGANIC_PERSONNEL__FETCH, ORGANIC_PERSONNEL__ADD, PERSONNEL__FETCH_LIST } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function fetchOrganicPersonnel() {
  return createAction({
    type: ORGANIC_PERSONNEL__FETCH,
    action: () => axios.get(`${baseUrl}/CommandStructure/GetCommandStructureByBranch?branchID=1&returnData=PERSONNEL`, requestHeaders),
  });
}

// export function addOraganicPersonnel(personnel) {
//   return createAction({
//     type: ORGANIC_PERSONNEL__ADD,
//     action: () => axios.post(`${baseUrl}/CommandStructure/PostCommandStructure`, qs.stringify(personnel), requestHeaders),
//   });
// }

// export function fetchPersonnelsById(id) {
//     return createAction({
//       type: ORGANIC_PERSONNEL__FETCH_LIST,
//       action: () => axios.get(`${baseUrl}/Personnel/GetPersonnel/${id}`, requestHeaders),
//     });
//   }
