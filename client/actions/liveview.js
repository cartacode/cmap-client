import axios from 'axios';

import { MAP_LAYERS__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders, formDataRequestHeader } from 'dictionary/network';
import { createAction } from 'util/action';



// Will fetch all the layers to display on MAP
export function fetchMapLayers() {
  return createAction({
    type: MAP_LAYERS__FETCH,
    action: () => axios.get(`${baseUrl}/MapLayerCategory/GetMapLayerCategories`, {headers:requestHeaders}),
  });
}



