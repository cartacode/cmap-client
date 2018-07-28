import axios from 'axios';
import qs from 'qs';

import { PAYLOAD__ADD, PAYLOAD_TYPE__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPayload(payload) {
  return createAction({
    type: PAYLOAD__ADD,
    action: () => axios.post(`${baseUrl}/Payload`, qs.stringify(payload), requestHeaders),
  });
}

export function fetchPayloadType() {
  return createAction({
    type: PAYLOAD_TYPE__FETCH,
    action: () => axios.get(`${baseUrl}/PayloadType`, requestHeaders)
  })
}
