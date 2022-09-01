export interface CustomerInterface {
  _id?: string
  email: string
  firstName: string
  lastName: string
  address: string
  phone: string
  birthDate: string
}

export interface OrderInterface {
  column: 'firstName' | 'lastName' | 'email' | 'address' | 'phone' | 'birthDate'
  direction: 'asc' | 'desc'
}

export function empty() {
  const customer: CustomerInterface = {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    birthDate: '',
  }
  return customer
}
