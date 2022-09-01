import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderMain from '@components/customer/main/Header'
import MainTable from '@components/customer/main/table/Table'
import HeaderCreate from '@components/customer/create/Header'
import FormCreate from '@components/customer/create/Form'
import HeaderEdit from '@components/customer/edit/Header'
import FormEdit from '@components/customer/edit/Form'
import useCustomerData from '@data/hook/useCustomer'
import {
  CustomerInterface,
  OrderInterface,
  empty,
} from '@interfaces/customerInterface'

export default function Clientes() {
  const [mode, setMode] = useState<'main' | 'create' | 'edit'>('main')
  const [customer, setCustomer] = useState<CustomerInterface>(empty())
  const [customers, setCustomers] = useState<CustomerInterface[]>([])
  const [allCustomers, setAllCustomers] = useState<CustomerInterface[]>([])
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderInterface>({
    column: 'firstName',
    direction: 'asc',
  })

  const {
    newCustomer,
    search,
    selectCustomer,
    deleteCustomer,
    switchMode,
    saveCustomer,
    getAllCustomers,
    orderBy,
  } = useCustomerData({
    setMode,
    customers,
    setCustomer,
    setCustomers,
    allCustomers,
    setAllCustomers,
    setError,
    setMessage,
    setOrder,
  })

  useEffect(() => {
    getAllCustomers()
  }, [])

  return (
    <Layout
      page={'Clientes'}
      title={'Clientes Cadastrados'}
      subtitle={'Visualize, edite e adicione novas informações aos clientes'}
      globalHeader={
        <>
          <HeaderMain
            newCustomer={newCustomer}
            search={search}
            mode={mode}
            error={error}
            message={message}
            deleteMessage={deleteMessage}
          />
          <HeaderCreate
            mode={mode}
            customer={customer}
            saveCustomer={saveCustomer}
            switchMode={switchMode}
            error={error}
            message={message}
          />
          <HeaderEdit
            mode={mode}
            customer={customer}
            saveCustomer={saveCustomer}
            switchMode={switchMode}
            error={error}
            message={message}
          />
        </>
      }
    >
      <MainTable
        customers={customers}
        deleteCustomer={deleteCustomer}
        mode={mode}
        selectCustomer={selectCustomer}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        deleteMessage={deleteMessage}
        setDeleteMessage={setDeleteMessage}
      />
      <FormCreate
        customer={customer}
        setCustomer={setCustomer}
        mode={mode}
        saveCustomer={saveCustomer}
      />
      <FormEdit
        customer={customer}
        setCustomer={setCustomer}
        mode={mode}
        saveCustomer={saveCustomer}
      />
    </Layout>
  )
}
