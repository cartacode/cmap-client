import axios from 'axios';
import qs from 'qs';

import { INTEL_EEI__ADD, INTEL_REQUEST__ADD } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addIntelEei(intelEei) {
  return createAction({
    type: INTEL_EEI__ADD,
    action: () => axios.post(`${baseUrl}/IntelReqEEI`, qs.stringify(intelEei), requestHeaders),
  });
}

export function addIntelRequest(intelRequest) {
  return createAction({
    type: INTEL_REQUEST__ADD,
    action: () => axios.post(`${baseUrl}/IntelRequest`, qs.stringify(intelRequest), requestHeaders),
  });
}
