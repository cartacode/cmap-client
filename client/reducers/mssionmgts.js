import { ATO_COLLECTION_PLAN__FETCH, ATO_GENERATION__FETCH, 
  FOP_ATO_PLATFORM__FETCH, FOP_PLATFORM__FETCH,
  FOP_ATO_CREW__FETCH, FOP_CREW__FETCH,
  PED_TASKS__FETCH ,PED_TASKS_ATO_GENERATION__FETCH, 
  SEARCH_MISSION_FILTER } from 'dictionary/action';
import initialState from 'store/initialState';

export default function collections(state = initialState.mssionmgts, { payload, type }) {
  switch (type) {

    case ATO_COLLECTION_PLAN__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ATO_COLLECTION_PLAN__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        atoCollectionPlans: payload.data,
      };
    case ATO_GENERATION__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ATO_GENERATION__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        atoGenerations: payload.data,
      };
    case FOP_PLATFORM__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FOP_PLATFORM__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        fopPlatforms: payload.data,
      };
    case FOP_ATO_PLATFORM__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FOP_ATO_PLATFORM__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        fopPlatformAto: payload.data,
      };
    case FOP_CREW__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FOP_CREW__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        fopCrews: payload.data,
      };
    case FOP_ATO_CREW__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FOP_ATO_CREW__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        fopCrewAto: payload.data,
      };
    case PED_TASKS__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PED_TASKS__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        pedTasks: payload.data,
      };
    case SEARCH_MISSION_FILTER.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SEARCH_MISSION_FILTER.SUCCESS:
      return {
        ...state,
        isFetching: false,
        filterResults: payload.data,
      }
    case PED_TASKS_ATO_GENERATION__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };  
    case PED_TASKS_ATO_GENERATION__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        pedTasksAtoGenerations: payload.data,
      };  
    default:
      return state;
  }
}
