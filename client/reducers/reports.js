import { REPORT__FETCH, REPORT__FETCH_ONE, REPORT__DELETE_ONE, REPORT__ADD, REPORT__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function reports(state = initialState.reports, { payload, type, error }) {
  switch (type) {
    case REPORT__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REPORT__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allReports: payload.data,
      };
   /*  case REPORT__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case REPORT__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        oneReport: payload.data,
      }; */
    case REPORT__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case REPORT__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case REPORT__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

   /*  case REPORT__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,

      };
    case REPORT__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case REPORT__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: error.response.data,
      };


    case REPORT__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,

      };
    case REPORT__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case REPORT__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: error.response.data,
      }; */

    default:
      return state;
  }
}
