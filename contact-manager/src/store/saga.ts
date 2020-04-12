import { PayloadAction } from '@reduxjs/toolkit';
import { outCleanContact, inCleanContacts, inCleanError, inCleanSuccess } from './dataTransform';
import { Contact, MDBResponse } from './../types/contacts';
import { createContact as apiCreateContact, readContacts as apiReadContacts } from './../api';
import { put, takeEvery, all, call, delay } from "redux-saga/effects"
import { fetchSample, fetchContacts, fetchContactsError, fetchContactSuccess, deleteMessage } from "./rootReducer";

/**
 * All results from the APIs should have the same pattern: 
 * 
 *  - response - the expected result or Null
 *  - error - the error message if the call fails or Null
 * 
 */
type APIResponse<T> = { response: T, error: Error }

/**
 * Add a contact in MDB and refresh the store
 * @param payload - the contact details we create in MDB
 */
function* sendCreateContact (action: PayloadAction<Contact>) {
  const cleanedContact = yield call(outCleanContact, action.payload)
  const { response, error }: APIResponse<Contact> = yield call(apiCreateContact, cleanedContact)

  if (response) {
    const successResponse = inCleanSuccess(response)
    yield put(fetchContactSuccess(successResponse))
    yield call(firstImport)
  } else {
    const errorMessage = yield call(inCleanError, error)
    yield put(fetchContactsError(errorMessage))
  }
}

function* watchSendCreateContact () {
  // @ts-ignore
  yield takeEvery('saga/createContact', sendCreateContact)
}


/**
 * Deletes message after a delay of 1s
 */
function* delayDeleteMessage () {
  yield delay(1000)
  yield put(deleteMessage())
}

function* watchDelayDeleteMessage () {
  // @ts-ignore
  yield takeEvery('saga/deleteMessage', delayDeleteMessage)
}


function* firstImport () {
  const { response, error }: APIResponse<MDBResponse> = yield call(apiReadContacts)
  if (response) {
    const contacts: Array<Contact> = yield call(inCleanContacts, response)
    yield put(contacts.length === 0 ? fetchSample() : fetchContacts(contacts))
  } else {
    const errorMessage = yield call(inCleanError, error)
    yield put(fetchContactsError(errorMessage))
    yield put(fetchSample())
  }
}

export function* rootSaga () {
  yield all([
    firstImport(),
    watchSendCreateContact(),
    watchDelayDeleteMessage()
  ])
}