import { PLATFORM_INVENTORY__FETCH, PLATFORM_INVENTORY__FETCH_ONE, PLATFORM_INVENTORY__DELETE_ONE, PLATFORM_INVENTORY__ADD, PLATFORM_INVENTORY__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function platforms(state = initialState.platforms, { payload, type }) {
  switch (type) {
    case PLATFORM_INVENTORY__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PLATFORM_INVENTORY__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allPlatformInventory: payload.data,
      };
    case PLATFORM_INVENTORY__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PLATFORM_INVENTORY__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        onePlatformInventory: payload.data,
      };
    case PLATFORM_INVENTORY__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case PLATFORM_INVENTORY__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case PLATFORM_INVENTORY__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

    case PLATFORM_INVENTORY__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,
      };
    case PLATFORM_INVENTORY__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case PLATFORM_INVENTORY__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: '',
      };

    case PLATFORM_INVENTORY__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,
      };
    case PLATFORM_INVENTORY__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case PLATFORM_INVENTORY__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: '',
      };

    default:
      return state;
  }
}
