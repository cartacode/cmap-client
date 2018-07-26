import axios from 'axios';
import { baseUrl }  from '../config'

function getRank() {
  return axios({
    method: 'get',
    url: `${baseUrl}/Ranks`
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
    url: `${baseUrl}/Personnel`,
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
    url: `${baseUrl}/campaigns/${id}/activate`
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