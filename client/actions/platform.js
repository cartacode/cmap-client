import axios from 'axios';
import qs from 'qs';

import { PLATFORM__ADD, PLATFORM__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPlatform(platform) {
  return createAction({
    type: PLATFORM__ADD,
    action: () => axios.post(`${baseUrl}/Platform`, qs.stringify(platform), requestHeaders),
  });
}

export function fetchPlatforms() {
  return createAction({
    type: PLATFORM__FETCH,
    action: () => axios.get(`${baseUrl}/Platform/GetPlatformsData`, requestHeaders),
  });
}
