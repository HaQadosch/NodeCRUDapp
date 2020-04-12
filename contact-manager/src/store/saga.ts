import { PayloadAction } from '@reduxjs/toolkit';
import { inCleanDeleteSuccess, outCleanContact, inCleanContacts, inCleanError, inCleanSuccess, outCleanContactId, inCleanContact, inCleanUpdateSuccess } from './dataTransform';
import { Contact, MDBResponse, MDBContact } from './../types/contacts';
import { deleteContact as apiDeleteContact, updateContact as apiUpdateContact, createContact as apiCreateContact, readContacts as apiReadContacts, readContact as apiReadContact } from './../api';
import { put, takeEvery, all, call, delay } from "redux-saga/effects"
import { updateSuccess, updateError, fetchContact, fetchSample, fetchContacts, fetchContactsError, fetchContactSuccess, deleteMessage, deleteSuccess, deleteError } from "./rootReducer";

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


/**
 * { type: 'saga/FetchContact', payload: '5e9326ea8d83660978870458'}
 * get a Contect from MDB and refresh the store
 * @param payload - the contact details we create in MDB
 */
function* sendFetchContact (action: PayloadAction<Contact['_id']>) {
  const cleanedContactId = yield call(outCleanContactId, action.payload)
  const { response, error }: APIResponse<MDBContact> = yield call(apiReadContact, cleanedContactId)

  if (response) {
    const contactResponse = inCleanContact(response)
    yield put(fetchContact(contactResponse))
  } else if (error) {
    const errorMessage = yield call(inCleanError, error)
    yield put(fetchContactsError(errorMessage))
  }
}

function* watchSendFetchContact () {
  // @ts-ignore
  yield takeEvery('saga/FetchContact', sendFetchContact)
}

/**
 * { type: 'saga/updateContact', payload: '{
 *  "_id": 65476737679149,
 *  "name": {
 *     "first": "Tony",
 *     "last": "Stark"
 *    },
 *   "phone": "+18138683770",
 *   "email": "ts_at_starkenterprises.co.uk"
 *  }}
 * get a Contect from MDB and refresh the store
 * @param payload - the contact details we create in MDB
 */
function* sendUpdateContact (action: PayloadAction<Contact>) {
  const cleanedContactId = yield call(outCleanContact, action.payload)
  const { response, error }: APIResponse<MDBContact> = yield call(apiUpdateContact, cleanedContactId)
  if (response) {
    const successResponse = inCleanUpdateSuccess(response)
    yield put(updateSuccess(successResponse))
    yield call(firstImport)
  } else if (error) {
    const errorMessage = yield call(inCleanError, error)
    yield put(updateError(errorMessage))
  }
}

function* watchSendUpdateContact () {
  // @ts-ignore
  yield takeEvery('saga/updateContact', sendUpdateContact)
}

/**
 * { type: 'saga/deleteContact', payload: 65476737679149 }
 * Delete a Contect from MDB and refresh the store
 * @param payload - the contact Id to delete in MDB
 */
function* sendDeleteContact (action: PayloadAction<Contact['_id']>) {
  const cleanedContactId: Contact['_id'] = yield call(outCleanContactId, action.payload)
  const { response, error }: APIResponse<MDBContact> = yield call(apiDeleteContact, cleanedContactId)
  console.log({ response, error, action, cleanedContactId })
  if (response) {
    const successResponse = inCleanDeleteSuccess(response)
    yield put(deleteSuccess(successResponse))
    yield call(firstImport)
  } else if (error) {
    const errorMessage = yield call(inCleanError, error)
    yield put(deleteError(errorMessage))
  }
}

function* watchSendDeleteContact () {
  // @ts-ignore
  yield takeEvery('saga/deleteContact', sendDeleteContact)
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
    watchDelayDeleteMessage(),
    watchSendFetchContact(),
    watchSendUpdateContact(),
    watchSendDeleteContact()
  ])
}