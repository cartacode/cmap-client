import { PERSONNEL__FETCH, PERSONNEL__FETCH_ONE, PERSONNEL__DELETE_ONE, PERSONNEL__ADD, PERSONNEL__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function personnels(state = initialState.personnels, { payload, type, error }) {
  switch (type) {
    case PERSONNEL__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PERSONNEL__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allPersonnels: payload.data,
      };
    case PERSONNEL__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case PERSONNEL__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        onePersonnel: payload.data,
      };
    case PERSONNEL__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case PERSONNEL__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case PERSONNEL__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

    case PERSONNEL__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,

      };
    case PERSONNEL__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case PERSONNEL__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: error.response.data,
      };


    case PERSONNEL__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,

      };
    case PERSONNEL__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case PERSONNEL__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: error.response.data,
      };

    default:
      return state;
  }
}
