import { OPORD__FETCH, OPORD__FETCH_ONE, OPORD__DELETE_ONE, OPORD__ADD, OPORD__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function opord(state = initialState.opord, { payload, type, error }) {
  switch (type) {
    case OPORD__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case OPORD__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allOpords: payload.data,
      };
   /*  case OPORD__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case OPORD__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        onePedTeam: payload.data,
      }; */
    case OPORD__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case OPORD__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case OPORD__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

   /*  case OPORD__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,

      };
    case OPORD__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case OPORD__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: error.response.data,
      };


    case OPORD__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,

      };
    case OPORD__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case OPORD__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: error.response.data,
      }; */

    default:
      return state;
  }
}
