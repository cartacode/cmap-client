import { PEDTEAM__FETCH, PEDTEAM__FETCH_ONE, PEDTEAM__DELETE_ONE, PEDTEAM__ADD, PEDTEAM__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function pedteam(state = initialState.pedteam, { payload, type, error }) {
  switch (type) {
    case PEDTEAM__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PEDTEAM__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allPedTeams: payload.data,
      };
    case PEDTEAM__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case PEDTEAM__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        onePedTeam: payload.data,
      };
    case PEDTEAM__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case PEDTEAM__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case PEDTEAM__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

    case PEDTEAM__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,

      };
    case PEDTEAM__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case PEDTEAM__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: error.response.data,
      };


    case PEDTEAM__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,

      };
    case PEDTEAM__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case PEDTEAM__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: error.response.data,
      };

    default:
      return state;
  }
}
