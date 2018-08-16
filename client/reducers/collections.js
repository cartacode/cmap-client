import { COLLECTION_PLAN__FETCH } from 'dictionary/action';
import initialState from 'store/initialState';

export default function collections(state = initialState.collections, { payload, type }) {
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
        allCollections: payload.data,
      };
    default:
      return state;
  }
}
