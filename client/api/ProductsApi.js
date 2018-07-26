import axios from 'axios';

export function getProducts(searchValue) {
  return axios({
    method: 'post',
    url: '/get-products',
    data: {
      searchValue,
    }
  },{
    headers: {
      'Accept': 'application/json'
    }
  });
}