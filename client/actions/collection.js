import axios from 'axios';
import { COLLECTION_PLAN__FETCH, INTEL_APPROVED_REQUEST__FETCH, MOVE_TO_COLLECTION__PLAN, MOVE_TO_INTEL__REQUEST, DELETE_COLLECTION__PLAN, 
  INTEL_APPROVED_REQUEST__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';


export function fetchCollectionPlans(unitId, statusId) {
  debugger;
  return createAction({
    type: COLLECTION_PLAN__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/getIntelRequestByUnitIdAndSatatusId?statusId=${statusId}&unitId=${unitId}`, requestHeaders),
    //action: () => axios.get(`${baseUrl}/IntelRequest/GetApprovedIntelRequests`, requestHeaders),
  });
}
export function fetchApprovedIntelRequests(unitId, statusId) {
  debugger;
  return createAction({
    type: INTEL_APPROVED_REQUEST__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/getIntelRequestByUnitIdAndSatatusId?statusId=${statusId}&unitId=${unitId}`, requestHeaders),
    //action: () => axios.get(`${baseUrl}/IntelRequest/GetApprovedIntelRequests`, requestHeaders),
  });
}
export function deleteApprovedIntelRequestById(id) {
  return createAction({
    type: INTEL_APPROVED_REQUEST__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/IntelRequest/DeleteIntelRequest/${id}`, requestHeaders),
  });
}


export function moveToCollectionPlan(intelRequestId, statusId) {
  return createAction({
    type: MOVE_TO_COLLECTION__PLAN,
    action: () => axios.put(`${baseUrl}/IntelRequest/PutCollectionIntelRequest?intelRequestId=${intelRequestId}&statusId=${statusId}`, requestHeaders),
  });
}

export function moveToIntelRequest(intelRequestId, statusId) {
  return createAction({
    type: MOVE_TO_INTEL__REQUEST,
    action: () => axios.put(`${baseUrl}/IntelRequest/PutCollectionIntelRequest?intelRequestId=${intelRequestId}&statusId=${statusId}`, requestHeaders),
  });
}

export function deleteCollectionPlanById(id) {
  return createAction({
    type: DELETE_COLLECTION__PLAN,
    action: () => axios.delete(`${baseUrl}/IntelRequest/DeleteIntelRequest/${id}`, requestHeaders),
  });
}