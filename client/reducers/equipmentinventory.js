import { EQUIPMENT_INVENTORY__FETCH, EQUIPMENT_INVENTORY__FETCH_ONE, EQUIPMENT_INVENTORY__DELETE_ONE, EQUIPMENT_INVENTORY__ADD, EQUIPMENT_INVENTORY__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';
import { Error } from '../dictionary/constants';

export default function equipments(state = initialState.equipments, { payload, type }) {
  switch (type) {
    case EQUIPMENT_INVENTORY__FETCH.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case EQUIPMENT_INVENTORY__FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        allEquipmentInventory: payload.data,
      };
    case EQUIPMENT_INVENTORY__FETCH_ONE.REQUEST:
      return {
        ...state,
        isFetchingOne: true,
      };
    case EQUIPMENT_INVENTORY__FETCH_ONE.SUCCESS:
      return {
        ...state,
        isFetchingOne: false,
        oneEquipmentInventory: payload.data,
      };
    case EQUIPMENT_INVENTORY__DELETE_ONE.REQUEST:
      return {
        ...state,
        isDeleted: false,
      };
    case EQUIPMENT_INVENTORY__DELETE_ONE.SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case EQUIPMENT_INVENTORY__DELETE_ONE.FAILURE:
      return {
        ...state,
        isDeleted: false,
      };

    case EQUIPMENT_INVENTORY__ADD.REQUEST:
      return {
        ...state,
        isAdded: false,
      };
    case EQUIPMENT_INVENTORY__ADD.SUCCESS:
      return {
        ...state,
        isAdded: true,
      };
    case EQUIPMENT_INVENTORY__ADD.FAILURE:
      return {
        ...state,
        isAdded: false,
        error: Error.ERROR_CODE,
      };

    case EQUIPMENT_INVENTORY__UPDATE.REQUEST:
      return {
        ...state,
        isUpdated: false,
      };
    case EQUIPMENT_INVENTORY__UPDATE.SUCCESS:
      return {
        ...state,
        isUpdated: true,
      };
    case EQUIPMENT_INVENTORY__UPDATE.FAILURE:
      return {
        ...state,
        isUpdated: false,
        error: Error.ERROR_CODE,
      };

    default:
      return state;
  }
}
