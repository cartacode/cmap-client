import axios from 'axios';
import qs from 'qs';

import { PAYLOAD_INVENTORY__ADD, PAYLOAD_INVENTORY__FETCH, PAYLOAD_LIST__FETCH, PAYLOAD_TYPE__FETCH, PAYLOAD__FETCH_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPayload(payload) {
  return createAction({
    type: PAYLOAD_INVENTORY__ADD,
    action: () => axios.post(`${baseUrl}/PayloadInventory/PostPayloadInventory`, qs.stringify(payload), requestHeaders),
  });
}

export function fetchPayloadList() {
  return createAction({
    type: PAYLOAD_LIST__FETCH,
    action: () => axios.get(`${baseUrl}/Payload/GetPayloads`, requestHeaders),
  });
}

export function fetchPayloads() {
  return createAction({
    type: PAYLOAD_INVENTORY__FETCH,
    action: () => axios.get(`${baseUrl}/PayloadInventory/GetPayloadInventoryData`, requestHeaders),
  });
}

export function fetchPayloadTypes() {
  return createAction({
    type: PAYLOAD_TYPE__FETCH,
    action: () => axios.get(`${baseUrl}/PayloadType`, requestHeaders),
  })
}

export function fetchPayloadById(id) {
  return createAction({
    type: PAYLOAD__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/PayloadInventory/GetPayloadInventory/${id}`, requestHeaders),
  })
}