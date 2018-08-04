import axios from 'axios';
import qs from 'qs';

import { PLATFORM_INVENTORY__ADD, PLATFORM_INVENTORY__UPDATE, PLATFORM_INVENTORY__FETCH, PLATFORM_INVENTORY__FETCH_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPlatformInventory(platform) {
  return createAction({
    type: PLATFORM_INVENTORY__ADD,
    action: () => axios.post(`${baseUrl}/PlatformInventory/PostPlatformInventory`, qs.stringify(platform), requestHeaders),
  });
}

export function updatePlatformInventory(id, platform) {
  return createAction({
    type: PLATFORM_INVENTORY__UPDATE,
    action: () => axios.put(`${baseUrl}/PlatformInventory/PutPlatformInventory/${id}`, qs.stringify(platform), requestHeaders),
  });
}

export function fetchPlatformInventory() {
  return createAction({
    type: PLATFORM_INVENTORY__FETCH,
    action: () => axios.get(`${baseUrl}/PlatformInventory/GetPlatformInventoryData`, requestHeaders),
  });
}

export function fetchPlatformInventoryById(id) {
  return createAction({
    type: PLATFORM_INVENTORY__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/PlatformInventory/GetPlatformInventory/${id}`, requestHeaders),
  });
}