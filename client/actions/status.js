import axios from 'axios';
import qs from 'qs';

import { STATUS_PLATFORM__FETCH, STATUS_PAYLOAD__FETCH, STATUS_PERSONNEL__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';



export function fetchPlatformsStatus() {
  return createAction({
    type: STATUS_PLATFORM__FETCH,
    action: () => axios.get(`${baseUrl}/PlatformStatus/GetPlatformStatusData`, requestHeaders),
  });
}

export function fetchPayloadsStatus() {
  return createAction({
    type: STATUS_PAYLOAD__FETCH,
    action: () => axios.get(`${baseUrl}/PayloadStatus/GetPayloadStatusData`, requestHeaders),
  });
}

export function fetchPersonnelsStatus() {
  return createAction({
    type: STATUS_PERSONNEL__FETCH,
    action: () => axios.get(`${baseUrl}/PersonnelStatus/GetPersonnelStatusData`, requestHeaders),
  });
}



