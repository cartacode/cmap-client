import axios from 'axios';
import qs from 'qs';

import {  PEDTEAM__FETCH, PEDTEAM__FETCH_ONE, PEDTEAM__DELETE_ONE, PEDTEAM__ADD, PEDTEAM__UPDATE } from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';

export function addPedTeam(pedteam) {
  return createAction({
    type: PEDTEAM__ADD,
    action: () => axios.post(`${baseUrl}/PedTeam`, pedteam, { headers: formDataRequestHeader }),
  });
}

export function updatePedTeam(id, data) {
  return createAction({
    type: PEDTEAM__UPDATE,
    action: () => axios.put(`${baseUrl}/PedTeam/PutPedTeam/${id}`, data, { headers: formDataRequestHeader }),
  });
}

export function fetchPedTeams() {
  return createAction({
    type: PEDTEAM__FETCH,
    action: () => axios.get(`${baseUrl}/Units/GetPEDTeamList`, { headers: requestHeaders }),
  });
}

export function fetchPedTeamById(id) {
  return createAction({
    type: PEDTEAM__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/PedTeam/GetPedTeam/${id}`, { headers: requestHeaders }),
  });
}

export function deletePedTeamById(id) {
  return createAction({
    type: PEDTEAM__DELETE_ONE,
    action: () => axios.delete(`${baseUrl}/PedTeam/DeletePedTeam/${id}`, { headers: requestHeaders }),
  });
}
