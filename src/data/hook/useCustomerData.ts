import { useEffect, useState } from 'react'
import Customer from '@api/Customer'
import { CustomerInterface, empty } from '@interfaces/customerInterface'

export default function useCustomerData() {
  const [mode, setMode] = useState<'table' | 'form'>('table')
  const [customer, setCustomer] = useState<CustomerInterface>(empty())
  const [customers, setCustomers] = useState<CustomerInterface[]>([])
  const [allCustomers, setAllCustomers] = useState<CustomerInterface[]>()

  useEffect(() => {
    getAllCustomers()
  }, [])

  async function getAllCustomers() {
    await Customer.index().then((customers) => {
      setCustomers(customers)
      setAllCustomers(customers)
    })
  }

  function newCustomer() {
    setCustomer(empty())
    setMode('form')
  }

  function selectCustomer(customer: CustomerInterface) {
    setCustomer(customer)
    switchMode()
  }

  async function saveCustomer(customer: CustomerInterface) {
    if (!customer._id) {
      await Customer.create(customer)
    } else {
      await Customer.update(customer)
    }
    getAllCustomers()
    switchMode()
  }

  async function deleteCustomer(customer: CustomerInterface) {
    await Customer.delete(customer._id as string)
    getAllCustomers()
  }

  function search(searchTag: string) {
    if (searchTag === '') {
      setCustomers(allCustomers ?? [])
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
      setCustomers(query ?? [])
    }
  }
  function switchMode() {
    mode === 'table' ? setMode('form') : setMode('table')
  }
  return {
    mode,
    customer,
    setCustomer,
    customers,
    newCustomer,
    selectCustomer,
    saveCustomer,
    deleteCustomer,
    search,
    switchMode,
  }
}
