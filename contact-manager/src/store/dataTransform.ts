import { Contact, Message } from './../types/contacts';
const identity = <T> (x: T) => x

export const outCleanContact = identity
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
