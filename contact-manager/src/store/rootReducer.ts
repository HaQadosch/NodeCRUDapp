import { contactsSlice } from "./slices/contacts"
import { combineReducers } from "@reduxjs/toolkit"

const {
  reducer: contactsReducer,
  actions: {
    fetchContact, fetchContacts, fetchSample,
    fetchContactsError, fetchContactsSuccess: fetchContactSuccess,
    deleteMessage,
    updateError, updateSuccess, updateContact,
    deleteSuccess, deleteError
  }
} = contactsSlice

export const rootReducer = combineReducers({
  contacts: contactsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export {
  deleteError, deleteSuccess, updateContact, fetchContacts, fetchSample, fetchContactsError, fetchContactSuccess, deleteMessage, fetchContact, updateError, updateSuccess
}