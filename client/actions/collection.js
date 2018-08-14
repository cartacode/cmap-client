import axios from 'axios';
import { COLLECTION_MANAGER__FETCH } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';



export function fetchCollectionManager() {
  return createAction({
    type: COLLECTION_MANAGER__FETCH,
    action: () => axios.get(`${baseUrl}/PlatformInventory/GetPlatformInventoryData`, requestHeaders),
  });
}


