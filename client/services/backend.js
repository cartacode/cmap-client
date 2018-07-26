import axios from 'axios';
import { base_url }  from '../config'

function getRank() {
  return axios({
    method: 'get',
    url: `${base_url}/Ranks`
  })
  .then(
    (response) => {
      return response.data;
    }
  );
}

function addPersonnel(personnelData) {
  return axios({
    method: 'post',
    url: `${base_url}/Personnel`,
    data: personnelData
  })
  .then(
    (response) => {
      return response.data;
    }
  );
}

/*function activateCampaign (id) {
  return axios({
    method: 'post',
    url: `${base_url}/campaigns/${id}/activate`
  })
    .then(
      (response) => {
        return response.data;
      }
    );
}*/


const backendApi = {
  getRank,
  addPersonnel
};

export default backendApi;