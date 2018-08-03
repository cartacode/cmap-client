import axios from 'axios';
import qs from 'qs';

import { PLATFORM_INVENTORY__ADD, PLATFORM_INVENTORY__UPDATE, PLATFORM_INVENTORY__FETCH, PLATFORM_INVENTORY__FETCH_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPlatform(platform) {
  return createAction({
    type: PLATFORM_INVENTORY__ADD,
    action: () => axios.post(`${baseUrl}/PlatformInventory`, qs.stringify(platform), requestHeaders),
  });
}

export function updatePlatform(platform) {
  return createAction({
    type: PLATFORM_INVENTORY__UPDATE,
    action: () => axios.put(`${baseUrl}/PlatformInventory`, qs.stringify(platform), requestHeaders),
  });
}

export function fetchPlatforms() {
  return createAction({
    type: PLATFORM_INVENTORY__FETCH,
    action: () => axios.get(`${baseUrl}/PlatformInventory/GetPlatformInventoryData`, requestHeaders),
  });
}

export function fetchPlatformById(id) {
  return createAction({
    type: PLATFORM_INVENTORY__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/PlatformInventory/GetPlatformInventory/${id}`, requestHeaders),
  });
}