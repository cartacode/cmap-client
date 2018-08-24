import axios from 'axios';
import { COLLECTION_PLAN__FETCH, ATO_GENERATION__FETCH, FLIGHT_OPS__FETCH, PED_TASKS__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';


export function fetchCollectionPlans(unitId, abbreviation, isInCollectionPlan) {
  return createAction({
    type: COLLECTION_PLAN__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequestByAbbreviation?abbreviation=${abbreviation}&unitId=${unitId}&isInCollectionPlan=${isInCollectionPlan}`, requestHeaders),
  });
}

export function fetchATOGeneration(unitId, abbreviation, isInCollectionPlan) {
  return createAction({
    type: ATO_GENERATION__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequestByAbbreviation?abbreviation=${abbreviation}&unitId=${unitId}&isInCollectionPlan=${isInCollectionPlan}`, requestHeaders),
  });
}

export function fetchFlightOps(unitId, abbreviation, isInCollectionPlan) {
  return createAction({
    type: FLIGHT_OPS__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequestByAbbreviation?abbreviation=${abbreviation}&unitId=${unitId}&isInCollectionPlan=${isInCollectionPlan}`, requestHeaders),
  });
}

export function fetchPedTasks(unitId, abbreviation, isInCollectionPlan) {
  return createAction({
    type: PED_TASKS__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequestByAbbreviation?abbreviation=${abbreviation}&unitId=${unitId}&isInCollectionPlan=${isInCollectionPlan}`, requestHeaders),
  });
}

