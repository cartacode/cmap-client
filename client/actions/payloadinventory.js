import axios from 'axios';
import qs from 'qs';

import { PAYLOAD_INVENTORY__ADD, PAYLOAD_INVENTORY__FETCH, PAYLOAD_INVENTORY__FETCH_ONE, PAYLOAD_INVENTORY__UPDATE, PAYLOAD_LIST__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPayloadInventory(payload) {
  return createAction({
    type: PAYLOAD_INVENTORY__ADD,
    action: () => axios.post(`${baseUrl}/PayloadInventory/PostPayloadInventory`, qs.stringify(payload), requestHeaders),
  });
}

export function updatePayloadInventory(id, data) {
  console.log('updating'+JSON.stringify(data));
  
  return createAction({
    type: PAYLOAD_INVENTORY__UPDATE,
    action: () => axios.put(`${baseUrl}/PayloadInventory/PutPayloadInventory/${id}`, qs.stringify(data), requestHeaders),
  });
}

export function fetchPayloadInventory() {
  return createAction({
    type: PAYLOAD_INVENTORY__FETCH,
    action: () => axios.get(`${baseUrl}/PayloadInventory/GetPayloadInventoryData`, requestHeaders),
  });
}

export function fetchPayloadInventoryById(id) {
  return createAction({
    type: PAYLOAD_INVENTORY__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/PayloadInventory/GetPayloadInventory/${id}`, requestHeaders),
  });
}

export function fetchPayloadList() {
  return createAction({
    type: PAYLOAD_LIST__FETCH,
    action: () => axios.get(`${baseUrl}/Payload/GetPayloads`, requestHeaders),
  });
}

// export function fetchPayloadTypes() {
//   return createAction({
//     type: PAYLOAD_TYPE__FETCH,
//     action: () => axios.get(`${baseUrl}/PayloadType`, requestHeaders),
//   });
// }