import {
  ATO_COLLECTION_PLAN__FETCH,
  ATO_GENERATION__FETCH,
  FOP_ATO_PLATFORM__FETCH,
  FOP_PLATFORM__FETCH,
  FOP_ATO_CREW__FETCH,
  FOP_CREW__FETCH,
  PED_TASKS__FETCH,
  PED_TASKS_ATO_GENERATION__FETCH,
  SEARCH_MISSION_FILTER,
  MISSION_SUMMARY__FETCH,
  MISSION_DETAIL__FETCH,
  COLLECTION_PLAN_TO_ATO_GENERATION,
  FLIGHT_OPS_TO_ATO_GEN__MOVE,
  ATO_GEN_TO_FLIGHT_OPS__MOVE,
  MISSION__ASSIGN_TEAMS,
} from 'dictionary/action';
import initialState from 'store/initialState';

export default function collections(state = initialState.mssionmgts, { payload, type, error }) {
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
      case MISSION_SUMMARY__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };  
    case MISSION_SUMMARY__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allMissionSummary: payload.data,
      };
    case MISSION_DETAIL__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };  
    case MISSION_DETAIL__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        oneMissionDetail: payload.data,
      };
    case COLLECTION_PLAN_TO_ATO_GENERATION.REQUEST:
      return {
        ...state,
        isBooked: true,
      };  
    case COLLECTION_PLAN_TO_ATO_GENERATION.SUCCESS:
      return {
        ...state,
        isBooked: false,
      };
    case COLLECTION_PLAN_TO_ATO_GENERATION.FAILURE:
      return {
        ...state,
        isBooked: true,
        error: error.response.data.Message,
      };  
    case FLIGHT_OPS_TO_ATO_GEN__MOVE.REQUEST:
      return {
        ...state,
        isBooked: true,
      };  
    case FLIGHT_OPS_TO_ATO_GEN__MOVE.SUCCESS:
      return {
        ...state,
        isBooked: false,
      };
    case FLIGHT_OPS_TO_ATO_GEN__MOVE.FAILURE:
      return {
        ...state,
        isBooked: true,
        error: error.response.data.Message,
      };   
    case ATO_GEN_TO_FLIGHT_OPS__MOVE.REQUEST:
      return {
        ...state,
        isBooked: true,
      };  
    case ATO_GEN_TO_FLIGHT_OPS__MOVE.SUCCESS:
      return {
        ...state,
        isBooked: false,
      };
    case ATO_GEN_TO_FLIGHT_OPS__MOVE.FAILURE:
      return {
        ...state,
        isBooked: true,
        error: error.response.data.Message,
      };
    case MISSION__ASSIGN_TEAMS.REQUEST:
      return {
        ...state,
        isBooked: true,
      };
    case MISSION__ASSIGN_TEAMS.SUCCESS:
      return {
        ...state,
        isBooked: false,
      };
    case MISSION__ASSIGN_TEAMS.FAILURE:
      return {
        ...state,
        isBooked: true,
        error: error.response.data.Message,
      };
    default:
      return state;
  }
}
