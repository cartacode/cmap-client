import axios from 'axios';
import qs from 'qs';

import { PLATFORM_INVENTORY__ADD, PLATFORM_INVENTORY__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPlatform(platform) {
  return createAction({
    type: PLATFORM_INVENTORY__ADD,
    action: () => axios.post(`${baseUrl}/PlatformInventory`, qs.stringify(platform), requestHeaders),
  });
}

export function fetchPlatforms() {
  return createAction({
    type: PLATFORM_INVENTORY__FETCH,
    action: () => axios.get(`${baseUrl}/PlatformInventory/GetPlatformInventoryData`, requestHeaders),
  });
}
