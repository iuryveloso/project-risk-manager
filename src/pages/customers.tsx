import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderTable from '@components/customer/table/Header'
import Table from '@components/customer/table/Table'
import HeaderForm from '@components/customer/form/Header'
import Form from '@components/customer/form/Form'
import useCustomerData from '@data/hook/useCustomer'
import { CustomerInterface, empty } from '@interfaces/customerInterface'

export default function Clientes() {
  const [mode, setMode] = useState<'table' | 'form'>('table')
  const [customer, setCustomer] = useState<CustomerInterface>(empty())
  const [customers, setCustomers] = useState<CustomerInterface[]>([])
  const [allCustomers, setAllCustomers] = useState<CustomerInterface[]>([])
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const {
    newCustomer,
    search,
    selectCustomer,
    deleteCustomer,
    switchMode,
    saveCustomer,
    getAllCustomers,
  } = useCustomerData({
    mode,
    setMode,
    setCustomer,
    setCustomers,
    allCustomers,
    setAllCustomers,
    setError,
    setMessage,
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
          <HeaderTable
            newCustomer={newCustomer}
            search={search}
            mode={mode}
            error={error}
            message={message}
          />
          <HeaderForm
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
      <Table
        customers={customers}
        deleteCustomer={deleteCustomer}
        mode={mode}
        selectCustomer={selectCustomer}
      />
      <Form
        customer={customer}
        setCustomer={setCustomer}
        mode={mode}
        saveCustomer={saveCustomer}
      />
    </Layout>
  )
}
