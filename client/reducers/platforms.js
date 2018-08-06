import { PLATFORM__ADD, PLATFORM__UPDATE, PLATFORM__FETCH, PLATFORM__FETCH_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function platforms(state = initialState.platforms, { payload, type }) {
  switch (type) {
   /*  case PLATFORM__ADD.REQUEST:
      return {
        ...state,
        isDone: true,
      }; */
    case PLATFORM__ADD.SUCCESS:
      return {
        ...state,
        isDone: true,
      };
   /*  case PLATFORM__ADD.FAILURE:
      return {
        ...state,
        isDone: false,
      }; */
   /*  case PLATFORM__UPDATE.REQUEST:
      return {
        ...state,
        isDone: true,
      }; */
    case PLATFORM__UPDATE.SUCCESS:
      return {
        ...state,
        isDone: true,
      };
   /*  case PLATFORM__UPDATE.FAILURE:
      return {
        ...state,
        isDone: false,
      }; */
    case PLATFORM__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PLATFORM__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allPlatforms: payload.data,
      };
    case PLATFORM__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PLATFORM__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        onePlatform: payload.data,
      };
    default:
      return state;
  }
}
