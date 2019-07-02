import { OPERATION__ADD, OPERATION__UPDATE, OPERATION__FETCH , OPERATION__FETCH_ONE, OPERATION__DELETE_ONE} from 'dictionary/action';
import initialState from 'store/initialState';

export default function operations(state = initialState.operations, { payload, type, error }) {
  switch (type) {
    case OPERATION__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case OPERATION__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allOperations: [{
          "OperationName":"op1", "Unit":"Unit1", "Country":"C1", "Region":"R1", "ThreatGroup":"T1"
        },
        {
          "OperationName":"op2", "Unit":"Unit2", "Country":"C2", "Region":"R2", "ThreatGroup":"T2"
        },
        {
          "OperationName":"op3", "Unit":"Unit3", "Country":"C3", "Region":"R3", "ThreatGroup":"T3"
        }],
      };
    case OPERATION__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case OPERATION__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        oneOperation: payload.data,
      };
    case OPERATION__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case OPERATION__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case OPERATION__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

    case OPERATION__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,

      };
    case OPERATION__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case OPERATION__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: error.response.data,
      };


    case OPERATION__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,

      };
    case OPERATION__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case OPERATION__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: error.response.data,
      };

    default:
      return state;
  }
}
