import axios from 'axios';
import qs from 'qs';

import { MUNITION_INVENTORY__ADD, MUNITION_INVENTORY__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addMunition(munition) {
  return createAction({
    type: MUNITION_INVENTORY__ADD,
    action: () => axios.post(`${baseUrl}/MunitionsInventory`, qs.stringify(munition), requestHeaders),
  });
}

export function fetchMunitions() {
  return createAction({
    type: MUNITION_INVENTORY__FETCH,
    action: () => axios.get(`${baseUrl}/MunitionsInventory/GetMunitionsInventoryData`, requestHeaders),
  });
}
