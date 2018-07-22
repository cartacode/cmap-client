import {call, put, takeEvery } from 'redux-saga/effects'
import {GET_PRODUCTS_PENDING, GET_PRODUCTS_FULFILLED, GET_PRODUCTS_REJECTED} from '../constants/actionTypes'
import {getProducts} from '../api/ProductsApi'


export function* loadProducts(searchValue) {
  try {
    const products = yield call(getProducts, searchValue.payload);
    yield put({ type: GET_PRODUCTS_FULFILLED, payload: products.data })
  } catch (e) {
    yield put({type: GET_PRODUCTS_REJECTED, error: e.error || e.statusText})
  }
}

/**
 * Connect actions to generators
 */
function* actionsTakenSaga() {
  yield takeEvery(GET_PRODUCTS_PENDING, loadProducts)
}

export default actionsTakenSaga
