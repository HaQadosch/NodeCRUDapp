import React from 'react'

interface IPostRequests {

}

const url = 'http://localhost:3030/contacts'
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

export const PostRequests: React.FC<IPostRequests> = () => {
  const [user, setUser] = React.useState<any>({})

  // POST to create an entry in MDB
  React.useEffect(() => {
    if (!user._id) fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataPOST)
    })
      .then(res => res.json())
      .then(data => setUser(data))
  }, [user])

  // GET to read an entry _id from MDB
  React.useEffect(() => {
    if (user?._id) {
      fetch(`${ url }/${ user._id }`, { method: 'GET' })
        .then(res => res.json())
        .then(data => console.table(data))
    }
  }, [user])

  // PUT to modify the entry _id in MDB
  React.useEffect(() => {
    if (user?._id) {
      fetch(`${ url }/${ user._id }`, {
        method: 'PUT',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPUT)
      })
        .then(res => res.json())
        .then(data => console.table(data))
    }
  }, [user])

  // DELETE to remove all the entries from MDB
  React.useEffect(() => {
    if (user?._id) {
      fetch(`${ url }`, { method: 'GET' })
        .then(res => res.json())
        .then(data => data.data.map((user: any) => {
          fetch(`${ url }/${ user._id }`, { method: 'DELETE' })
          return data
        }))
    }
  }, [user])

  return (
    <div>
      <pre>{ JSON.stringify(user, null, 2) }</pre>
    </div>
  )
}