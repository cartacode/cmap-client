import axios from 'axios';
import qs from 'qs';

import { STATUS_PLATFORM__FETCH, STATUS_PAYLOAD__FETCH, STATUS_PERSONNEL__FETCH, STATUS_MUNITION__FETCH, STATUS_PLATFORM__FETCH_ONE, STATUS_PLATFORM__UPDATE, STATUS_PAYLOAD__FETCH_ONE, STATUS_PAYLOAD__UPDATE, STATUS_PERSONNEL__FETCH_ONE, STATUS_PERSONNEL__UPDATE, STATUS_MUNITION__FETCH_ONE, STATUS_MUNITION__UPDATE} from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';



export function fetchPlatformsStatus() {
  return createAction({
    type: STATUS_PLATFORM__FETCH,
    action: () => axios.get(`${baseUrl}/PlatformStatus/GetPlatformStatusData`, {headers:requestHeaders}),
  });
}

export function fetchPlatformStatusById(id) {
  return createAction({
    type: STATUS_PLATFORM__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/PlatformStatus/GetPlatformStatus/${id}`, {headers:requestHeaders}),
  });
}

export function updatePlatformStatus(id, platform) {
  return createAction({
    type: STATUS_PLATFORM__UPDATE,
    action: () => axios.put(`${baseUrl}/PlatformStatus/PutPlatformStatusUpdate/${id}`, JSON.stringify(platform), {headers:requestHeaders}),
  });
}

export function fetchPayloadsStatus() {
  return createAction({
    type: STATUS_PAYLOAD__FETCH,
    action: () => axios.get(`${baseUrl}/PayloadStatus/GetPayloadStatusData`, {headers:requestHeaders}),
  });
}

export function fetchPayloadStatusById(id) {
  return createAction({
    type: STATUS_PAYLOAD__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/PayloadStatus/GetPayloadStatus/${id}`, {headers:requestHeaders}),
  });
}

export function updatePayloadStatus(id, payload) {
  return createAction({
    type: STATUS_PAYLOAD__UPDATE,
    action: () => axios.put(`${baseUrl}/PayloadStatus/PutPayloadStatusUpdate/${id}`, JSON.stringify(payload), {headers:requestHeaders}),
  });
}

export function fetchPersonnelsStatus() {
  return createAction({
    type: STATUS_PERSONNEL__FETCH,
    action: () => axios.get(`${baseUrl}/PersonnelStatus/GetPersonnelStatusData`, {headers:requestHeaders}),
  });
}

export function fetchPersonnelStatusById(id) {
  return createAction({
    type: STATUS_PERSONNEL__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/PersonnelStatus/GetPersonnelStatus/${id}`, {headers:requestHeaders}),
  });
}

export function updatePersonnelStatus(id, personnel) {
  return createAction({
    type: STATUS_PERSONNEL__UPDATE,
    action: () => axios.put(`${baseUrl}/PersonnelStatus/PutPersonnelStatu/${id}`, JSON.stringify(personnel), {headers:requestHeaders}),
  });
}

export function fetchMunitionsStatus() {
  return createAction({
    type: STATUS_MUNITION__FETCH,
    action: () => axios.get(`${baseUrl}/MunitionStatus/GetMunitionsStatusData`, {headers:requestHeaders}),
  });
}

export function fetchMunitionsStatusById(id) {
  return createAction({
    type: STATUS_MUNITION__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/MunitionStatus/GetMunitionsStatus/${id}`, {headers:requestHeaders}),
  });
}

export function updateMunitionStatus(id, munition) {
  return createAction({
    type: STATUS_MUNITION__UPDATE,
    action: () => axios.put(`${baseUrl}/MunitionStatus/PutMunitionsStatusUpdate/${id}`, JSON.stringify(munition), {headers:requestHeaders}),
  });
}
