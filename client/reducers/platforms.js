import { PLATFORM__FETCH } from 'dictionary/action';
import initialState from 'store/initialState';

export default function platforms(state = initialState.platforms, { payload, type }) {
  switch (type) {
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
    default:
      return state;
  }
}
