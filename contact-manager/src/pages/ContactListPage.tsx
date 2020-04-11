import React from 'react'
import { ContactList } from '../components/ContactList'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'

interface IContactListPage {

}

export const ContactListPage: React.FC<IContactListPage> = () => {
  const { contacts } = useSelector(({ contacts }: RootState) => contacts)

  return (
    <div>
      <h1>List of contacts</h1>
      <ContactList contacts={ contacts } />
    </div>
  )
}