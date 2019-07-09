import axios from 'axios';
import qs from 'qs';

import {  REPORT_CHATROOM__ADD, REPORT_CHATROOM__UPDATE, REPORT_UPLOAD__ADD, REPORT_UPLOAD__UPDATE, REPORT__FETCH_ONE, REPORT_LIST__FETCH,  REPORT__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';

 export function addChatRoom(chatRoom) {
  return createAction({
    type: REPORT_CHATROOM__ADD,
    action: () => axios.post(`${baseUrl}/reports/PostChatRoom`, chatRoom, {headers: requestHeaders }),
  });
}

export function updateChatRoom(id, chatRoom) {
  return createAction({
    type: REPORT_CHATROOM__UPDATE,
    action: () => axios.put(`${baseUrl}/reports/PutChatRoom/${id}`, chatRoom, {headers: requestHeaders }),
  });
} 



export function addReportUpload(report) {
  return createAction({
    type: REPORT_UPLOAD__ADD,
    action: () => axios.post(`${baseUrl}/reports/PostReportUpload`, report, {headers: formDataRequestHeader }),
  });
}

export function updateReportUpload(id, report) {
  return createAction({
    type: REPORT_UPLOAD__UPDATE,
    action: () => axios.put(`${baseUrl}/reports/PutReportUpload/${id}`, report, {headers: formDataRequestHeader }),
  });
} 

export function fetchReportList() {
  return createAction({
    type: REPORT_LIST__FETCH,
    action: () => axios.get(`${baseUrl}/Report/GetReports`, {headers: requestHeaders}),
  });
}
 


export function fetchReportById(id) {
  return createAction({
    type: REPORT_UPLOAD__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/report/GetReport/${id}`, {headers:requestHeaders}),
  });
}
 

export function fetchChatRoomById(id) {
  return createAction({
    type:REPORT_CHATROOM__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/report/GetReport/${id}`, {headers:requestHeaders}),
  });
}

export function deleteReportById(id) {
  return createAction({
    type: REPORT__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/Report/DeleteReport/${id}`, {headers:requestHeaders}),
  });
}
