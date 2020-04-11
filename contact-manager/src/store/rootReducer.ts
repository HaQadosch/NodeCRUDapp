import { counterSlice } from "./slices/counter"
import { contactsSlice } from "./slices/contacts"
import { combineReducers } from "@reduxjs/toolkit"


const {
  reducer: counterReducer,
  actions: { increment, decrement }
} = counterSlice

const {
  reducer: contactsReducer,
  actions: { fetchContacts, fetchSample, addContact, fetchContactsError }
} = contactsSlice

export const rootReducer = combineReducers({
  counter: counterReducer,
  contacts: contactsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export {
  increment, decrement,
  fetchContacts, fetchSample, addContact, fetchContactsError
}