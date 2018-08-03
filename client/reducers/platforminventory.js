import { PLATFORM_INVENTORY__FETCH, PLATFORM_INVENTORY__FETCH_ONE } from 'dictionary/action';
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
        allPlatforms: payload.data,
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
        onePlatform: payload.data,
      };
    default:
      return state;
  }
}
