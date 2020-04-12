import { contactsSlice } from "./slices/contacts"
import { combineReducers } from "@reduxjs/toolkit"

const {
  reducer: contactsReducer,
  actions: {
    fetchContact, fetchContacts, fetchSample,
    fetchContactsError, fetchContactsSuccess: fetchContactSuccess,
    deleteMessage,
    updateError, updateSuccess, updateContact
  }
} = contactsSlice

export const rootReducer = combineReducers({
  contacts: contactsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export {
  updateContact, fetchContacts, fetchSample, fetchContactsError, fetchContactSuccess, deleteMessage, fetchContact, updateError, updateSuccess
}