import Layout from '@components/template/Layout'
import HeaderTable from '@components/Customer/Table/Header'
import Table from '@components/Customer/Table'
import HeaderForm from '@components/Customer/Form/Header'
import Form from '@components/Customer/Form'
import useCustomerData from '@data/hook/useCustomer'

export default function Clientes() {
  const {
    newCustomer,
    search,
    mode,
    customers,
    selectCustomer,
    deleteCustomer,
    switchMode,
    customer,
    setCustomer,
    saveCustomer,
  } = useCustomerData()
  return (
    <Layout
      page={'Clientes'}
      title={'Clientes Cadastrados'}
      subtitle={'Visualize, edite e adicione novas informações aos clientes'}
      globalHeader={
        <>
          <HeaderTable newCustomer={newCustomer} search={search} mode={mode} />
          <HeaderForm
            mode={mode}
            customer={customer}
            saveCustomer={saveCustomer}
            switchMode={switchMode}
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
