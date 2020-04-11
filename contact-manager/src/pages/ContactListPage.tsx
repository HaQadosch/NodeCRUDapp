import React from 'react'
import { ContactList } from '../components/ContactList'

interface IContactListPage {

}

export const ContactListPage: React.FC<IContactListPage> = () => {

  return (
    <div>
      <h1>List of contacts</h1>
      <ContactList />
    </div>
  )
}