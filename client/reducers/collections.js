import { COLLECTION_PLAN__FETCH, INTEL_APPROVED_REQUEST__FETCH } from 'dictionary/action';
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
        allCollectionsPlan: payload.data,
      };
    case INTEL_APPROVED_REQUEST__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case INTEL_APPROVED_REQUEST__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allApprovedIntelRequests: payload.data,
      };
    default:
      return state;
  }
}
