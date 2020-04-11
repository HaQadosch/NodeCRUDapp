import { outCleanContact, inCleanContacts } from './dataTransform';
import { Contact, MDBResponse } from './../types/contacts';
import { createContact as apiCreateContact, readContacts as apiReadContacts } from './../api';
import { put, takeEvery, all, call } from "redux-saga/effects"
import { increment, fetchSample, addContact, fetchContacts, fetchContactsError } from "./rootReducer";

/**
 * All results from the APIs should have the same pattern: 
 * 
 *  - response - the expected result or Null
 *  - error - the error message if the call fails or Null
 * 
 */
type APIResponse<T> = { response: T, error: Error }

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export function* incrementAsync () {
  yield call(delay, 1000)
  yield put(increment())
}

function* watchIncrementAsync () {
  // @ts-ignore
  yield takeEvery('saga/incrementAsync', incrementAsync)
}

/**
 * Add a contact in MDB and into the store
 * @param payload - the contact details we create in MDB
 */
// function* createContact (payload: Contact) {
//   const res = yield call(createContact, payload)
//   const contact = outCleanContact<Contact>(res)
//   yield put(addContact(contact))
// }

/**
 * Add a contact in MDB and refresh the store
 * @param payload - the contact details we create in MDB
 */
function* sendCreateContact (payload: Contact) {
  const cleanedContact = yield call(outCleanContact, payload)
  const { response, error }: APIResponse<Array<Contact>> = yield call(apiCreateContact, cleanedContact)
  if (response) {
    yield put(fetchContacts(response))
  } else {
    yield put(fetchContactsError(error))
  }
}

function* watchSendCreateContact () {
  // @ts-ignore
  yield takeEvery('saga/createContact', sendCreateContact)
}


function* firstImport () {
  const { response, error }: APIResponse<MDBResponse> = yield call(apiReadContacts)
  if (response) {
    const contacts: Array<Contact> = yield call(inCleanContacts, response)
    yield put(contacts.length === 0 ? fetchSample() : fetchContacts(contacts))
  } else {
    yield put(fetchContactsError(error))
    yield put(fetchSample())
  }
}

export function* rootSaga () {
  yield all([
    firstImport(),
    watchSendCreateContact()
  ])
}