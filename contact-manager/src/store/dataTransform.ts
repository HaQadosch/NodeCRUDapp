import { Contact, Message, MDBContact } from './../types/contacts';

export const outCleanContact = (contact: Contact) => contact
export const outCleanContactId = (id: Contact['_id']): Contact['_id'] => id
export const inCleanContacts = (collection: { data: Array<Contact> }) => {
  return collection.data
}
export const inCleanContact = ({ createdAt, updatedAt, ...contact }: MDBContact): Contact => {
  return contact
}

export const inCleanUpdateSuccess = ({ createdAt, updatedAt, ...contact }: MDBContact): { message: Message, contact: Contact } => {
  return {
    message: {
      type: 'success',
      title: 'Update Successful',
      content: `Contact "${ contact.email }" has been updated!`
    },
    contact
  }
}

export const inCleanDeleteSuccess = ({ createdAt, updatedAt, ...contact }: MDBContact): { message: Message, contact: Contact } => {
  return {
    message: {
      type: 'success',
      title: 'Delete Successful',
      content: `Contact "${ contact.email }" has been deleted!`
    },
    contact
  }
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