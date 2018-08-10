import { CCIRPIR__FETCH, CCIRPIR__FETCH_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function ccirpir(state = initialState.ccirpir, { payload, type }) {
  switch (type) {
    case CCIRPIR__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CCIRPIR__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allCcirPirs: payload.data,
      };
    case CCIRPIR__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CCIRPIR__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        oneCcirPir: payload.data,
      };
      
   

    default:
      return state;
  }
}
