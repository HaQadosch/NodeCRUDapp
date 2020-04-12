import { Message } from './../../types/contacts';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Draft } from "immer"
import { Contact } from "../../types/contacts"

interface MutableContactsState {
  contacts: Array<Contact>
  contact: Contact | null
  message: Message | {}
}

type ContactsState = Readonly<MutableContactsState>

const initialState = {
  contacts: [],
  contact: null,
  message: {},
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
    state.contact = null
  }
}

/**
 * { type: 'contacts/fetchContact', payload: C ontact}
 */
const fetchContactReducer = {
  fetchContact: (state: Draft<ContactsState>, { payload }: PayloadAction<Contact>) => {
    state.contact = null
  }
}

/**
 * { type: 'contacts/fetchContactsError', payload: Message }
 * After an error when creating a contact
 */
const fetchContactsErrorReducer = {
  fetchContactsError: (state: Draft<ContactsState>, { payload }: PayloadAction<Message>) => {
    state.contact = null
    state.message = payload
  }
}

/**
 * { type: 'contacts/updateSuccess', payload: Contact & Message }
 * After successfuly adding a new contact in MDB.
 * The contact is added by the FETCH response but we don't use it.
 */
const updateSuccessReducer = {
  updateSuccess: (state: Draft<ContactsState>, { payload: { message, contact } }: PayloadAction<{ contact: Contact, message: Message }>) => {
    state.message = message
  }
}

/**
 * { type: 'contacts/updateContact', payload: ContactId }
 * After successfuly adding a new contact in MDB.
 * The contact is added by the FETCH response but we don't use it.
 */
const updateContactReducer = {
  updateContact: (state: Draft<ContactsState>, { payload }: PayloadAction<Contact['_id']>) => {
    state.contact = state.contacts.find(contact => contact._id === payload) || null
  }
}

/**
 * { type: 'contacts/updatesError', payload: Message }
 * After an error when creating a contact
 */
const updateErrorReducer = {
  updateError: (state: Draft<ContactsState>, { payload }: PayloadAction<Message>) => {
    state.contact = null
    state.message = payload
  }
}

/**
 * { type: 'contacts/fetchContactSuccess', payload: Contact & Message }
 * After successfuly adding a new contact in MDB.
 * The contact is added by the FETCH response but we don't use it.
 */
const fetchContactsSuccessReducer = {
  fetchContactsSuccess: (state: Draft<ContactsState>, { payload: { message } }: PayloadAction<{ contact: Contact, message: Message }>) => {
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
    state.contact = null
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
    ...deleteMessageReducer,
    ...fetchContactReducer,
    ...updateSuccessReducer,
    ...updateErrorReducer,
    ...updateContactReducer
  }
})
