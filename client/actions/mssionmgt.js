import axios from 'axios';
import { COLLECTION_PLAN__FETCH, ATO_GENERATION__FETCH, FLIGHT_OPS__FETCH, PED_TASKS__FETCH, ROUTE_ATO_GENERATION, COLLECTION_PLAN_TO_ATO_GENERATION, FLIGHT_OPS_ATO_GENERATION, SEARCH_MISSION_FILTER } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';


export function fetchATOCollectionPlans(abbreviation, unitId) {
  return createAction({
    type: COLLECTION_PLAN__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequestForCollectionPlan?abbreviation=${abbreviation}&unitId=${unitId}`, requestHeaders),
  });
}

export function fetchATOGenerations(statusId, unitId) {
  return createAction({
    type: ATO_GENERATION__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetMissionATOIntelRequest?statusId=${statusId}&unitId=${unitId}`, requestHeaders),
  });
}

export function routeATOGeneration(unitId, statusId) {
  return createAction({
    type: ROUTE_ATO_GENERATION,
    action: () => axios.put(`${baseUrl}/IntelRequest/RouteToMissionATOIntelRequest?unitId=${unitId}&statusId=${statusId}`, requestHeaders),
  });
}

export function searachAndFilter(data) {
  return createAction({
    type: SEARCH_MISSION_FILTER,
    action: () => axios.put(`${baseUrl}/Search/PutMissionPlatformInventory`, data, requestHeaders),
  });
}

export function moveToATOGenerationFromCollectionPlan(data) {
  return createAction({
    type: COLLECTION_PLAN_TO_ATO_GENERATION,
    action: () => axios.post(`${baseUrl}/Mission/PostMission`, data, requestHeaders),
  });
}

export function flightOpsATOGenerations(statusId, unitId) {
  return createAction({
    type: FLIGHT_OPS_ATO_GENERATION,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequestByUnitIdAndSatatusId?statusId=${statusId}&unitId=${unitId}`, requestHeaders),
  });
}
export function fetchFlightOps(statusId, unitId) {
  return createAction({
    type: FLIGHT_OPS__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetMissionFlightOpsIntelRequest?statusId=${statusId}&unitId=${unitId}`, requestHeaders),
  });
}

export function fetchPedTasks(unitId, abbreviation, isInCollectionPlan) {
  return createAction({
    type: PED_TASKS__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequestByAbbreviation?abbreviation=${abbreviation}&unitId=${unitId}&isInCollectionPlan=${isInCollectionPlan}`, requestHeaders),
  });
}

