import axios from 'axios';
import { EQUIPMENT_INVENTORY__ADD, EQUIPMENT_INVENTORY__UPDATE, EQUIPMENT_INVENTORY__FETCH, EQUIPMENT_INVENTORY__FETCH_ONE, EQUIPMENT_INVENTORY__DELETE_ONE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addEquipmentInventory(equipment) {
  return createAction({
    type: EQUIPMENT_INVENTORY__ADD,
    action: () => axios.post(`${baseUrl}/Equipment/PostEquipment`, JSON.stringify(equipment), { headers: requestHeaders }),
  });
}

export function updateEquipmentInventory(id, equipment) {  
  return createAction({
    type: EQUIPMENT_INVENTORY__UPDATE,
    action: () => axios.put(`${baseUrl}/Equipment/PutEquipment/${id}`, JSON.stringify(equipment), { headers: requestHeaders }),
  });
}

export function fetchEquipmentInventory() {
  return createAction({
    type: EQUIPMENT_INVENTORY__FETCH,
    action: () => axios.get(`${baseUrl}/Equipment/GetEquipment`, { headers: requestHeaders }),
  });
}

export function fetchEquipmentInventoryById(id) {
  return createAction({
    type: EQUIPMENT_INVENTORY__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/Equipment/GetEquipment/${id}`, { headers: requestHeaders }),
  });
}

export function deleteEquipmentInventoryById(id) {
  return createAction({
    type: EQUIPMENT_INVENTORY__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/Equipment/DeleteEquipment/${id}`, { headers: requestHeaders }),
  });
}
