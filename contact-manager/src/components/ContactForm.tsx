import React from 'react'

import { Grid, Form, Button } from "semantic-ui-react"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { AppDispatch } from '../store/store'
import { Message } from '../types/contacts'
import { Redirect } from "react-router-dom";

interface IContactForm {
}

export const ContactForm: React.FC<IContactForm> = () => {
  const { message, contact } = useSelector(({ contacts }: RootState) => contacts)
  const { handleSubmit, errors, register } = useForm({ defaultValues: contact || undefined })
  const dispatch: AppDispatch = useDispatch()
  const onSubmit = (data: Record<string, any>) => {
    const type = contact ? 'saga/updateContact' : 'saga/createContact'
    const payload = contact ? { ...data, _id: (contact || { _id: '' })?._id } : data
    dispatch({ type, payload })
  }

  if ((message as Message).type === 'success') {
    return <Redirect to="/" />
  }

  return (
    <Grid centered columns={ 2 }>
      <Grid.Column>
        <h1 style={ { marginTop: '1em' } }>Add new contact</h1>
        <Form onSubmit={ handleSubmit(onSubmit) } >
          <Form.Group widths="equal" >
            <Form.Field className={ errors.name ? 'error' : '' }>
              <label htmlFor='name.first'>First name
                <input
                  id='name.first'
                  name='name.first'
                  type='text'
                  placeholder='First Name'
                  ref={ register({ required: true, minLength: 2 }) }
                />
              </label>
              {
                (errors?.name?.first?.type ?? '') === 'required'
                  ? <span className='error'>You need to provide first name.</span>
                  : null
              }
              {
                (errors?.name?.first?.type ?? '') === 'minLength'
                  ? <span className='error'>Must be 2 or more characters.</span>
                  : null
              }
            </Form.Field>
            <Form.Field >
              <label htmlFor='name.last'>Last name
                <input
                  id='name.last'
                  name='name.last'
                  type='text'
                  placeholder='Last Name'
                  ref={ register }
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Field className={ errors.phone ? 'error' : '' }>
            <label htmlFor='phone'>Phone number
                <input
                id='phone'
                name='phone'
                type='text'
                placeholder='Phone Number'
                ref={ register({ required: true, pattern: /^\+(?:[0-9] ?){6,14}[0-9]$/ }) }
              />
            </label>
            {
              (errors?.phone?.type ?? '') === 'required'
                ? <span className='error'>You need to provide a phone number.</span>
                : null
            }
            {
              (errors?.phone?.type ?? '') === 'pattern'
                ? <span className='error'>Phone numbers must be in i18n format.</span>
                : null
            }
          </Form.Field>
          <Form.Field className={ errors.email ? 'error' : '' }>
            <label htmlFor='email'>Email
                <input
                id='email'
                name='email'
                type='email'
                placeholder='Email'
                ref={ register({ required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ }) }
              />
            </label>
            {
              (errors?.email?.type ?? '') === 'required'
                ? <span className='error'>You need to provide an Email address.</span>
                : null
            }
            {
              (errors?.email?.type ?? '') === 'pattern'
                ? <span className='error'>Invalid Email address.</span>
                : null
            }
          </Form.Field>
          <Button primary type='submit'>
            Save
          </Button>
        </Form>
      </Grid.Column>
    </Grid >
  )
}