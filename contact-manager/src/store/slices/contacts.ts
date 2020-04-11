import { createSlice } from "@reduxjs/toolkit"
import {  Draft } from "immer"
import { Contact } from "../../types/contacts"

interface MutableContactsState {
  contacts: Array<Contact>
  contact: Contact | {}
  message: Object
}

type ContactsState = Readonly<MutableContactsState>

const initialState = {
  contacts: [],
  contact: {},
  message: {}
}

const sample: Array<Contact> = [
  {
    _id: '1',
    name: {
      first: 'John',
      last: 'Doe',
    },
    phone: '555',
    email: 'john@gmail.com',
  },
  {
    _id: '2',
    name: {
      first: 'Bruce',
      last: 'Wayne',
    },
    phone: '777',
    email: 'bruce.wayne@gmail.com',
  },
]


/**
 * { type: 'contacts/fetchContacts' }
 */
const fetchContactsReducer = {
  fetchContacts: (state: Draft<ContactsState>) => {
    state.contact = {}
  }
}

/**
 * { type: 'contacts/fetchSample' }
 * Insert the contact samples
 */
const fetchSampleReducer = {
  fetchSample: (state: Draft<ContactsState>) => {
    state.contacts = sample
    state.contact = {}
  }
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    ...fetchContactsReducer,
    ...fetchSampleReducer
  }
})
