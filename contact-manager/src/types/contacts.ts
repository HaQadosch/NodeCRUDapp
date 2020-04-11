export interface Contact {
  _id: string
  name: {
    first: string
    last: string
  }
  phone: string
  email: string
}

export interface MDBResponse {
  total: number
  limit: number
  skip: number
  data: Array<Contact>
}