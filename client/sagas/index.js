import { fork } from 'redux-saga/effects'

import actionsTakenSaga from './actionsTakenSaga'

/**
 * Combine sagas
 */
export default function* rootSaga() {
  yield [
    fork(actionsTakenSaga),
  ]
}