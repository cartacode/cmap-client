import { COLLECTION_PLAN__FETCH, ATO_GENERATION__FETCH, FLIGHT_OPS__FETCH, PED_TASKS__FETCH, FLIGHT_OPS_ATO_GENERATION ,PED_TASKS_ATO_GENERATION__FETCH, SEARCH_MISSION_FILTER} from 'dictionary/action';
import initialState from 'store/initialState';

export default function collections(state = initialState.mssionmgts, { payload, type }) {
  switch (type) {

    case COLLECTION_PLAN__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case COLLECTION_PLAN__FETCH.SUCCESS:
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
    case FLIGHT_OPS__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FLIGHT_OPS__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        flightOps: payload.data,
      };
    case FLIGHT_OPS_ATO_GENERATION.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FLIGHT_OPS_ATO_GENERATION.SUCCESS:
      return {
        ...state,
        isFetching: false,
        flightOpsAtoGenerations: payload.data,
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
