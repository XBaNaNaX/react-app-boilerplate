import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, FETCHING_UNIT } from './constants'
import { put, takeEvery } from 'redux-saga/effects'
import getPeople from './api'

function* fetchData (action) {
  try {
    const data = yield getPeople.getPeoples()
    yield put({ type: FETCHING_DATA_SUCCESS, data })
  } catch (e) {
    yield put({ type: FETCHING_DATA_FAILURE })
  }
}

function* fetchUnitData (action) {
  try {
    const unit = yield getPeople.getUnits()
    yield put({ type: FETCHING_UNIT, unit })
  } catch (e) {
    yield put({ type: FETCHING_DATA_FAILURE })
  }
}

function* dataSaga () {
  yield takeEvery(FETCHING_DATA, fetchData)
  yield takeEvery(FETCHING_DATA, fetchUnitData)
}

export default dataSaga