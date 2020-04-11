import { put, takeEvery, all, call } from "redux-saga/effects"
import { increment, fetchSample } from "./rootReducer";

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export function* incrementAsync () {
  yield call(delay, 1000)
  yield put(increment())
}

function* watchIncrementAsync () {
  // @ts-ignore
  yield takeEvery('saga/incrementAsync', incrementAsync)
}

function* firstImport () {
  yield put(fetchSample())
}

export function* rootSaga () {
  yield all([
    firstImport(),
    watchIncrementAsync()
  ])
}