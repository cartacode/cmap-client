import axios from 'axios';
import { COLLECTION_PLAN__FETCH, INTEL_REQUEST__FETCH, MOVE_TO_COLLECTION__PLAN, MOVE_TO_INTEL__REQUEST, DELETE_COLLECTION__PLAN } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';



export function fetchCollectionPlans() {
  return createAction({
    type: COLLECTION_PLAN__FETCH,
    action: () => axios.get(`${baseUrl}/PlatformInventory/GetPlatformInventoryData`, requestHeaders),
  });
}

export function fetchIntelRequests() {
  return createAction({
    type: INTEL_REQUEST__FETCH,
    action: () => axios.get(`${baseUrl}/PlatformInventory/GetPlatformInventoryData`, requestHeaders),
  });
}

export function moveToCollectionPlan() {
  return createAction({
    type: MOVE_TO_COLLECTION__PLAN,
    action: () => axios.get(`${baseUrl}/PlatformInventory/GetPlatformInventoryData`, requestHeaders),
  });
}

export function moveToIntelRequest() {
  return createAction({
    type: MOVE_TO_INTEL__REQUEST,
    action: () => axios.get(`${baseUrl}/PlatformInventory/GetPlatformInventoryData`, requestHeaders),
  });
}

export function deleteCollectionPlanById(id) {
  return createAction({
    type: DELETE_COLLECTION__PLAN,
    action: () => axios.delete(`${baseUrl}/Platform/DeletePlatform/${id}`, requestHeaders),
  });
}