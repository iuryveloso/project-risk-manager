import { Dispatch, SetStateAction } from 'react'
import Customer from '@api/Customer'
import {
  CustomerInterface,
  OrderInterface,
} from '@interfaces/customerInterface'
import { faker } from '@faker-js/faker'

interface useCustomerInterface {
  setMode?: Dispatch<SetStateAction<'main' | 'create' | 'edit'>>
  setCustomer?: Dispatch<SetStateAction<CustomerInterface>>
  customers?: CustomerInterface[]
  setCustomers?: Dispatch<SetStateAction<CustomerInterface[]>>
  allCustomers?: CustomerInterface[]
  setAllCustomers?: Dispatch<SetStateAction<CustomerInterface[]>>
  setError?: Dispatch<SetStateAction<string | null>>
  setMessage?: Dispatch<SetStateAction<string | null>>
  setOrder?: Dispatch<SetStateAction<OrderInterface>>
}

export default function useCustomer({
  setMode,
  setCustomer,
  customers,
  setCustomers,
  allCustomers,
  setAllCustomers,
  setError,
  setMessage,
  setOrder,
}: useCustomerInterface) {
  function getAllCustomers() {
    Customer.index().then((e) => {
      if (setCustomers) {
        setCustomers(e)
      }
      if (setAllCustomers) {
        setAllCustomers(e)
      }
    })
  }

  function newCustomer() {
    if (setCustomer && setMode) {
      const fullDate = new Date(faker.date.birthdate())
      const year = fullDate.toLocaleString('default', { year: 'numeric' })
      const month = fullDate.toLocaleString('default', { month: '2-digit' })
      const day = fullDate.toLocaleString('default', { day: '2-digit' })
      const customer: CustomerInterface = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: `${faker.address.streetAddress(
          true
        )} - ${faker.address.cityName()}`,
        email: faker.internet.email(),
        phone: faker.phone.number('(##) 9####-####'),
        birthDate: `${year}-${month}-${day}`,
      }
      setCustomer(customer)
      switchMode('create')
    }
  }

  function orderBy(
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) {
    if (setCustomers && customers && setOrder) {
      setCustomers(
        customers.sort((a, b) => {
          if (a[column].toLowerCase() > b[column].toLowerCase()) {
            if (direction === 'asc') {
              return 1
            } else {
              return -1
            }
          } else if (a[column].toLowerCase() < b[column].toLowerCase()) {
            if (direction === 'desc') {
              return 1
            } else {
              return -1
            }
          } else {
            return 0
          }
        })
      )
    }
  }

  function selectCustomer(customer: CustomerInterface) {
    if (setCustomer) {
      setCustomer(customer)
    }
    switchMode('edit')
  }

  function saveCustomer(customer: CustomerInterface) {
    if (!customer._id) {
      Customer.create(customer).then((e) => setAlert(e))
    } else {
      Customer.update(customer).then((e) => setAlert(e))
    }
  }

  function deleteCustomer(customer: CustomerInterface) {
    Customer.delete(customer._id as string).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
        getAllCustomers()
      }
    })
  }

  function search(searchTag: string) {
    if (searchTag === '') {
      if (setCustomers) {
        setCustomers(allCustomers ?? [])
      }
    } else {
      const query = allCustomers?.filter(
        (customer) =>
          customer.email.toLowerCase().includes(searchTag.toLowerCase()) ||
          customer.firstName.toLowerCase().includes(searchTag.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(searchTag.toLowerCase()) ||
          customer.address.toLowerCase().includes(searchTag.toLowerCase()) ||
          customer.phone.toLowerCase().includes(searchTag.toLowerCase()) ||
          customer.birthDate.toLowerCase().includes(searchTag.toLowerCase())
      )
      if (setCustomers) {
        setCustomers(query ?? [])
      }
    }
  }

  function setAlert(e: any) {
    if (e.error) {
      showError(e.error)
    } else if (e.message) {
      showMessage(e.message)
      switchMode('main')
    }
  }
  function showError(message: any, seconds = 5) {
    if (setError) {
      setError(message)
      setTimeout(() => setError(null), seconds * 1000)
    }
  }
  function showMessage(message: any, seconds = 5) {
    if (setMessage) {
      setMessage(message)
      setTimeout(() => setMessage(null), seconds * 1000)
    }
  }

  function switchMode(mode: 'main' | 'create' | 'edit') {
    if (setMode) {
      setMode(mode)
      if (mode === 'main') {
        getAllCustomers()
      }
    }
  }
  return {
    newCustomer,
    selectCustomer,
    saveCustomer,
    deleteCustomer,
    search,
    switchMode,
    getAllCustomers,
    orderBy,
  }
}
