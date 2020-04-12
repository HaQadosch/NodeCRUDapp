import React from 'react'
import { Message as TMessage } from '../types/contacts'
import { Message } from "semantic-ui-react"
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'

interface FlashMessage {
  message: TMessage
}

export const FlashMessage: React.FC<FlashMessage> = ({ message: { type, title, content } }) => {
  const dispatch: AppDispatch = useDispatch()
  React.useEffect(() => {
    dispatch({ type: 'saga/deleteMessage' })
    // eslint-disable-next-line
  }, [])
  return (
    <Message
      positive={ type === 'success' }
      negative={ type === 'fail' }
      header={ title }
      content={ content }
    />
  )
}
