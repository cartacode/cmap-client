import axios from 'axios';
import qs from 'qs';

import { PLATFORM__ADD, PLATFORM__FETCH, PLATFORM__FETCH_ONE, PLATFORM__UPDATE, PLATFORM__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPlatform(platform) {
  return createAction({
    type: PLATFORM__ADD,
    action: () => axios.post(`${baseUrl}/Platform/PostPlatform`, qs.stringify(platform), requestHeaders),
  });
}

export function updatePlatform(id, platform) {
  return createAction({
    type: PLATFORM__UPDATE,
    action: () => axios.put(`${baseUrl}/Platform/PutPlatform/${id}`, qs.stringify(platform), requestHeaders),
  });
}

export function fetchPlatforms() {
  return createAction({
    type: PLATFORM__FETCH,
    action: () => axios.get(`${baseUrl}/Platform/GetPlatformsData`, requestHeaders),
  });
}


export function fetchPlatformById(id) {
  return createAction({
    type: PLATFORM__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/Platform/GetPlatform/${id}`, requestHeaders),
  });
}

export function deletePlatformById(id) {
  return createAction({
    type: PLATFORM__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/Platform/DeletePlatform/${id}`, requestHeaders),
  });
}


