import axios from 'axios';
import { COLLECTION_PLAN__FETCH, INTEL_APPROVED_REQUEST__FETCH, MOVE_TO_COLLECTION__PLAN, MOVE_TO_INTEL__REQUEST, DELETE_COLLECTION__PLAN, 
  INTEL_APPROVED_REQUEST__DELETE_ONE, ROUTE_COLLECTION__PLAN } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';


export function fetchCollectionPlans(unitId, abbreviation) {
  return createAction({
    type: COLLECTION_PLAN__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequestForCollectionPlan?abbreviation=${abbreviation}&unitId=${unitId}`, requestHeaders),
  });
}
export function fetchApprovedIntelRequests(unitId, abbreviation, isInCollectionPlan) {
  return createAction({
    type: INTEL_APPROVED_REQUEST__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequestByAbbreviation?abbreviation=${abbreviation}&unitId=${unitId}&isInCollectionPlan=${isInCollectionPlan}`, requestHeaders),
  });
}

export function deleteApprovedIntelRequestById(intelRequestId, statusId) {
  return createAction({
    type: INTEL_APPROVED_REQUEST__DELETE_ONE,
    action: () => axios.put(`${baseUrl}/IntelRequest/ChangeIntelRequestStatus?intelRequestId=${intelRequestId}&statusId=${statusId}`, requestHeaders),
  });
}


export function moveToCollectionPlan(intelRequestId) {
  return createAction({
    type: MOVE_TO_COLLECTION__PLAN,
    action: () => axios.put(`${baseUrl}/IntelRequest/MoveToCollectionPlan/${intelRequestId}`, requestHeaders),
  });
}


export function moveToIntelRequest(intelRequestId, statusId) {
  return createAction({
    type: MOVE_TO_INTEL__REQUEST,
    action: () => axios.put(`${baseUrl}/IntelRequest/MoveOutFromCollectionPlan/${intelRequestId}/${statusId}`, requestHeaders),
  });
}

export function deleteCollectionPlanById(id) {
  return createAction({
    type: DELETE_COLLECTION__PLAN,
    action: () => axios.delete(`${baseUrl}/IntelRequest/DeleteIntelRequest/${id}`, requestHeaders),
  });
}

export function routeCollectionIntelRequest(unitId, statusId) {
  return createAction({
    type: ROUTE_COLLECTION__PLAN,
    action: () => axios.put(`${baseUrl}/IntelRequest/RouteCollectionIntelRequest?unitId=${unitId}&statusId=${statusId}`, requestHeaders),
  });
}
