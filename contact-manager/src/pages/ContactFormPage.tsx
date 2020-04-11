import React from 'react'
import { ContactForm } from '../components/ContactForm'

interface IContactFormPage {

}

export const ContactFormPage: React.FC<IContactFormPage> = () => {

  return (
    <div>
      <ContactForm />
    </div>
  )
}