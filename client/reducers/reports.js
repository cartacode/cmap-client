import {  REPORT_CHATROOM__ADD, REPORT_CHATROOM__UPDATE, REPORT_UPLOAD__ADD, REPORT_UPLOAD__UPDATE, REPORT_UPLOAD__FETCH_ONE, REPORT_CHATROOM__FETCH_ONE, REPORT_LIST__FETCH,  REPORT__DELETE_ONE } from 'dictionary/action';
import initialState from 'store/initialState';

export default function reports(state = initialState.reports, { payload, type, error }) {
  switch (type) {
    case REPORT_LIST__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REPORT_LIST__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allReports: payload.data,
      };
    case REPORT_UPLOAD__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case REPORT_UPLOAD__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        oneReport: payload.data,
      };

      case REPORT_CHATROOM__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case REPORT_CHATROOM__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        oneChatRoom: payload.data,
      };
      
      
    case REPORT__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case REPORT__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case REPORT__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

     case REPORT_UPLOAD__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,

      };
    case REPORT_UPLOAD__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case REPORT_UPLOAD__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: error.response.data,
      };


    case REPORT_UPLOAD__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,

      };
    case REPORT_UPLOAD__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case REPORT_UPLOAD__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: error.response.data,
      }; 

      case REPORT_CHATROOM__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,

      };
    case REPORT_CHATROOM__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case REPORT_CHATROOM__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: error.response.data,
      };


    case REPORT_CHATROOM__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,

      };
    case REPORT_CHATROOM__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case REPORT_CHATROOM__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: error.response.data,
      }; 

    default:
      return state;
  }
}
