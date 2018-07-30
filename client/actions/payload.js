import axios from 'axios';
import qs from 'qs';

import { PAYLOAD__ADD, PAYLOAD__FETCH, PAYLOAD_LIST__FETCH, PAYLOAD_TYPE__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPayload(payload) {
  return createAction({
    type: PAYLOAD__ADD,
    action: () => axios.post(`${baseUrl}/Payload`, qs.stringify(payload), requestHeaders),
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
    type: PAYLOAD__FETCH,
    action: () => axios.get(`${baseUrl}/Payload/GetPayloadsData`, requestHeaders),
  });
}

export function fetchPayloadTypes() {
  return createAction({
    type: PAYLOAD_TYPE__FETCH,
    action: () => axios.get(`${baseUrl}/PayloadType`, requestHeaders),
  })
}