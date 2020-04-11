import React from 'react'
import { Message as TMessage } from '../types/contacts'
import { Message } from "semantic-ui-react"

interface FlashMessage {
  message: TMessage
}

export const FlashMessage1: React.FC<FlashMessage> = ({ message: { type, title, content } }) => {
  return (
    <Message
      positive={ type === 'success' }
      negative={ type === 'fail' }
      header={ title }
      content={ content }
    />
  )
}
