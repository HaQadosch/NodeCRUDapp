import { Contact } from './../types/contacts';
const identity = <T> (x: T) => x

export const outCleanContact = identity
export const inCleanContacts = (collection: { data: Array<Contact> }) => {
  console.log({ collection })
  return collection.data
}
