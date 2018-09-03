import axios from 'axios';

import { COLLECTION_PLAN__FETCH, ATO_GENERATION__FETCH, FLIGHT_OPS__FETCH, PED_TASKS__FETCH, ROUTE_ATO_GENERATION, COLLECTION_PLAN_TO_ATO_GENERATION,
   FLIGHT_OPS_ATO_GENERATION, PED_TASKS_ATO_GENERATION__FETCH, SEARCH_MISSION_FILTER, ATO_GEN_TO_FLIGHT_OPS__MOVE, FLIGHT_OPS_TO_ATO_GEN__MOVE, 
   ATO_GEN_TO_PED_TASK__MOVE, PED_TASK_TO_ATO_GEN__MOVE, ATO_GEN_TO_COLLECTION_PLAN__MOVE } from 'dictionary/action';
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

export function platformFilter(data) {
  return createAction({
    type: SEARCH_MISSION_FILTER,
    action: () => axios.put(`${baseUrl}/Search/SearchMissionPlatformInventory`, data, requestHeaders),
  });
}

export function teamFilter(data) {
  return createAction({
    type: SEARCH_MISSION_FILTER,
    action: () => axios.put(`${baseUrl}/Search/SearchMissionTeam`, data, requestHeaders),
  });
}

export function moveToATOGenerationFromCollectionPlan(data) {
  return createAction({
    type: COLLECTION_PLAN_TO_ATO_GENERATION,
    action: () => axios.post(`${baseUrl}/Mission/PostMission`, data, requestHeaders),
  });
}

export function moveToCollectionPlanFromATOGeneration(missionId) {
  return createAction({
    type: ATO_GEN_TO_COLLECTION_PLAN__MOVE,
    action: () => axios.delete(`${baseUrl}/Mission/DeleteMission/${missionId}`, requestHeaders),
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

export function fetchPedTasksATOGenerations(statusId, unitId) {
  return createAction({
    type: PED_TASKS_ATO_GENERATION__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetMissionPEDTaskingATOIntelRequest?statusId=${statusId}&unitId=${unitId}`, requestHeaders),
  });
}

export function fetchPedTasks(statusId, unitId) {
  return createAction({
    type: PED_TASKS__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetMissionPEDTaskingIntelRequest?statusId=${statusId}&unitId=${unitId}`, requestHeaders),
  });
}

export function moveToFlightOPSFromATOGeneration(missionId, data) {
  return createAction({
    type: ATO_GEN_TO_FLIGHT_OPS__MOVE,
    action: () => axios.put(`${baseUrl}/Mission/PutMission/missionId=${missionId}`, data, requestHeaders),
  });
}

export function moveToATOGenerationFromFlightOPS(missionId) {
  return createAction({
    type: FLIGHT_OPS_TO_ATO_GEN__MOVE,
    action: () => axios.get(`${baseUrl}/Mission/MoveOutFromFlightOPS?missionId=${missionId}`, requestHeaders),
  });
}

export function moveToPedTaskFromATOGeneration(missionId, data) {
  return createAction({
    type: ATO_GEN_TO_PED_TASK__MOVE,
    action: () => axios.put(`${baseUrl}/Mission/PutMission/missionId=${missionId}`, data, requestHeaders),
  });
}

export function moveToATOGenerationFromPedTask(missionId) {
  return createAction({
    type: PED_TASK_TO_ATO_GEN__MOVE,
    action: () => axios.put(`${baseUrl}/Mission/MoveOutFromFlightOPS?missionId=${missionId}`, requestHeaders),
  });
}
