import { contactsSlice } from "./slices/contacts"
import { combineReducers } from "@reduxjs/toolkit"

const {
  reducer: contactsReducer,
  actions: { fetchContacts, fetchSample, fetchContactsError, fetchContactSuccess, deleteMessage }
} = contactsSlice

export const rootReducer = combineReducers({
  contacts: contactsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export {
  fetchContacts, fetchSample, fetchContactsError, fetchContactSuccess, deleteMessage
}