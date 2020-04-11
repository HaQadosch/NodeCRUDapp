import { Contact } from './types/contacts';
const url = 'http://localhost:3030/contacts'

type APIResponse = Promise<{ response: JSON | null, error: Error | null }>

const dataPOST = {
  "name": {
    "first": "Tony",
    "last": "Stark"
  },
  "phone": "+18138683770",
  "email": "tony@starkenterprises.com"
}

const dataPUT = {
  "name": {
    "first": "Tony",
    "last": "Stark"
  },
  "phone": "+18138683770",
  "email": "ts@starkenterprises.com"
}

/**
 * Add a contact into MDB
 * @param contact - the contact we want to add
 * @returns the fetch promise, either the created contact or an Error
 * @example const res = createContact({
 *  "name": {
 *   "first": "Tony",
 *   "last": "Stark"
 *  },
 *  "phone": "+18138683770",
 *  "email": "ts_at_starkenterprises.com"
 * })
 */
export const createContact = (contact: Contact): APIResponse => {
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json()
    })
    .then(response => ({ response, error: null }))
    .catch(createContactErr => ({ error: createContactErr, response: null }))
}

/**
 * Get the contact associated with the given Id
 * @param contactId - the _id of the contact we want to fetch
 * @returns the contact or an Error
 * @example const contacts = readContacts()
 */
export const readContacts = (): APIResponse => {
  return fetch(`${ url }`, { method: 'GET' })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json()
    })
    .then(response => ({ response, error: null }))
    .catch(readContactErr => ({ error: readContactErr, response: null }))
}

/**
 * Get the contact associated with the given Id
 * @param contactId - the _id of the contact we want to fetch
 * @returns the contact or an Error
 * @example const contact = readContact(237461675464)
 */
export const readContact = (contactId: Contact['_id']): APIResponse => {
  return fetch(`${ url }/${ contactId }`, { method: 'GET' })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json()
    })
    .catch(readContactErr => readContactErr)
}

/**
 * Update the contact with the given data
 * @param contact - the new content for the contact with the same _id
 * @returns the contact with the updated data or an Error
 * @example const updatedContact = updateContact({
 *  "_id": 65476737679149,
 *  "name": {
 *   "first": "Tony",
 *   "last": "Stark"
 *  },
 *  "phone": "+18138683770",
 *  "email": "ts_at_starkenterprises.co.uk"
 * }) */
export const updateContact = (contact: Contact): APIResponse => {
  return fetch(`${ url }/${ contact._id }`, {
    method: 'PUT',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json()
    })
    .catch(updateContactErr => updateContactErr)
}

/**
 * Sometimes, people need to be removed. This is the contrat.
 * @param contactId - the contact we want to remove.
 * @returns a bottle of milk
 * @example const res = deleteContact(679684968)
 */
export const deleteContact = (contactId: Contact['_id']): APIResponse => {
  return fetch(`${ url }/${ contactId }`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json()
    })
    .catch(deleteContactErr => deleteContactErr)
}