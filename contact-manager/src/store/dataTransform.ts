import { Contact, Message } from './../types/contacts';

export const outCleanContact = (contact: Contact) => contact
export const inCleanContacts = (collection: { data: Array<Contact> }) => {
  return collection.data
}

export const inCleanError = (error: any): Message => {
  const err = error?.response?.data ?? error
  return {
    type: 'fail',
    title: err.name,
    content: err.message
  }
}

export const inCleanSuccess = (contact: Contact): { message: Message, contact: Contact } => {
  return {
    message: {
      type: 'success',
      title: 'Success',
      content: 'New contact added'
    },
    contact
  }
}