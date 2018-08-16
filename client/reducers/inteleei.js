import { INTEL_EEI__FETCH, INTEL_EEI__FETCH_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function inteleei(state = initialState.inteleei, { payload, type }) {
  switch (type) {
    case INTEL_EEI__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case INTEL_EEI__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        eeis: payload.data,
      };
    case INTEL_EEI__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case INTEL_EEI__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        oneEei: payload.data,
      };
    default:
      return state;
  }
}
