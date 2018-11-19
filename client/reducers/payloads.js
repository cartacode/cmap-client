import { PAYLOAD__FETCH, PAYLOAD_LIST__FETCH, PAYLOAD_TYPE__FETCH, PAYLOAD__FETCH_ONE, PAYLOAD__DELETE_ONE, PAYLOAD__ADD, PAYLOAD__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';
import { Error } from '../dictionary/constants';

export default function payloads(state = initialState.payloads, { payload, type, error }) {
  switch (type) {
    case PAYLOAD__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PAYLOAD__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allPayloads: payload.data,
      };
    case PAYLOAD_LIST__FETCH.REQUEST:
      return {
        ...state,
        isListFetching: true,
      };
    case PAYLOAD_LIST__FETCH.SUCCESS:
      return {
        ...state,
        isListFetching: false,
        payloadList: payload.data,
      };
    case PAYLOAD_TYPE__FETCH.REQUEST:
      return {
        ...state,
        isTypesFetching: true,
      };
    case PAYLOAD_TYPE__FETCH.SUCCESS:
      return {
        ...state,
        isTypesFetching: false,
        payloadTypes: payload.data,
      };
    case PAYLOAD__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PAYLOAD__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        onePayload: payload.data,
      };
    case PAYLOAD__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case PAYLOAD__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case PAYLOAD__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };
    case PAYLOAD__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,

      };
    case PAYLOAD__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case PAYLOAD__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: Error.ERROR_CODE,
      };
    case PAYLOAD__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,

      };
    case PAYLOAD__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case PAYLOAD__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: Error.ERROR_CODE,
      };
    default:
      return state;
  }
}
