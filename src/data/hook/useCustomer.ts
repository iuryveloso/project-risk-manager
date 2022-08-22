import Customer from '@api/Customer'
import { CustomerInterface, empty } from '@interfaces/customerInterface'
import { Dispatch, SetStateAction } from 'react'

interface useCustomerInterface {
  mode?: 'table' | 'form'
  setMode?: Dispatch<SetStateAction<'table' | 'form'>>
  setCustomer?: Dispatch<SetStateAction<CustomerInterface>>
  setCustomers?: Dispatch<SetStateAction<CustomerInterface[]>>
  allCustomers?: CustomerInterface[]
  setAllCustomers?: Dispatch<SetStateAction<CustomerInterface[]>>
  setError?: Dispatch<SetStateAction<string | null>>
  setMessage?: Dispatch<SetStateAction<string | null>>
}

export default function useCustomer({
  mode,
  setMode,
  setCustomer,
  setCustomers,
  allCustomers,
  setAllCustomers,
  setError,
  setMessage,
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
    if (setCustomer) {
      setCustomer(empty())
    }
    if (setMode) {
      switchMode()
    }
  }

  function selectCustomer(customer: CustomerInterface) {
    if (setCustomer) {
      setCustomer(customer)
    }
    switchMode()
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
      switchMode()
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

  function switchMode() {
    if (setMode) {
      if (mode === 'table') {
        setMode('form')
      } else {
        setMode('table')
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
  }
}
