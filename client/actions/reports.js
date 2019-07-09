import axios from 'axios';
import qs from 'qs';

import {  REPORT_LIST__FETCH,  REPORT__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';

/* export function addPayload(payload) {
  return createAction({
    type: PAYLOAD__ADD,
    action: () => axios.post(`${baseUrl}/Payload/PostPayload`, payload, {headers: formDataRequestHeader }),
  });
}

export function updatePayload(id, payload) {
  return createAction({
    type: PAYLOAD__UPDATE,
    action: () => axios.put(`${baseUrl}/Payload/PutPayload/${id}`, payload, {headers: formDataRequestHeader }),
  });
} */

export function fetchReportList() {
  return createAction({
    type: REPORT_LIST__FETCH,
    action: () => axios.get(`${baseUrl}/Report/GetReports`, {headers: requestHeaders}),
  });
}
/* 
export function fetchPayloads() {
  return createAction({
    type: PAYLOAD__FETCH,
    action: () => axios.get(`${baseUrl}/Payload/GetPayloadsData`, {headers: requestHeaders }),
  });
}

export function fetchPayloadTypes() {
  return createAction({
    type: PAYLOAD_TYPE__FETCH,
    action: () => axios.get(`${baseUrl}/PayloadType`, {headers: requestHeaders }),
  })
}

export function fetchPayloadsById(id) {
  return createAction({
    type: PAYLOAD__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/Payload/GetPayload/${id}`, {headers:requestHeaders}),
  });
}
 */
export function deleteReportsById(id) {
  return createAction({
    type: REPORT__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/Payload/DeletePayload/${id}`, {headers:requestHeaders}),
  });
}
