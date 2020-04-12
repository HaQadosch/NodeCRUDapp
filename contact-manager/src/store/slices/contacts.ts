import { Message } from './../../types/contacts';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Draft } from "immer"
import { Contact } from "../../types/contacts"

interface MutableContactsState {
  contacts: Array<Contact>
  contact: Contact | {}
  message: Message | {}
  loading: boolean
}

type ContactsState = Readonly<MutableContactsState>

const initialState = {
  contacts: [],
  contact: {},
  message: {},
  loading: false
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
 * { type: 'contacts/fetchContacts', payload: [contact1, contact2, ...]}
 */
const fetchContactsReducer = {
  fetchContacts: (state: Draft<ContactsState>, { payload }: PayloadAction<Array<Contact>>) => {
    state.contacts = payload
    state.contact = {}
  }
}

/**
 * { type: 'contacts/fetchContactsError', payload: Message }
 * After an error when creating a contact
 */
const fetchContactsErrorReducer = {
  fetchContactsError: (state: Draft<ContactsState>, { payload }: PayloadAction<Message>) => {
    state.contact = {}
    state.message = payload
  }
}

/**
 * { type: 'contacts/fetchContactSuccess', payload: Contact & Message }
 * After successfuly adding a new contact in MDB
 */
const fetchContactsSuccessReducer = {
  fetchContactSuccess: (state: Draft<ContactsState>, { payload: { contact, message } }: PayloadAction<{ contact: Contact, message: Message }>) => {
    state.contact = contact
    state.message = message
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

/**
 * { type: 'contacts/deleteMessage' }
 * delete the message
 */
const deleteMessageReducer = {
  deleteMessage: (state: Draft<ContactsState>) => {
    state.message = {}
  }
}


export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    ...fetchContactsReducer,
    ...fetchSampleReducer,
    ...fetchContactsErrorReducer,
    ...fetchContactsSuccessReducer,
    ...deleteMessageReducer
  }
})
