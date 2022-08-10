import { editIcon, deleteIcon } from '@components/icons'
import { CustomerInterface } from '@interfaces/customerInterface'

interface ContentInterface {
  mode: 'table' | 'form'
  customers: CustomerInterface[]
  selectCustomer: (customer: CustomerInterface) => void
  deleteCustomer: (customer: CustomerInterface) => Promise<void>
}

export default function Content({
  mode,
  customers,
  selectCustomer,
  deleteCustomer,
}: ContentInterface) {
  function renderHeader() {
    return (
      <tr>
        <th className={'text-left pl-7'}>Nome</th>
        <th className={'text-left p-2'}>Sobrenome</th>
        <th className={'text-left p-2'}>Email</th>
        <th className={'text-left p-2'}>Endereço</th>
        <th className={'text-left p-2'}>Telefone</th>
        <th className={'text-left p-2'}>Data de Nascimento</th>
        <th className={'text-right pr-6'}>Ações</th>
      </tr>
    )
  }

  function renderData() {
    return customers?.map((customer, i) => {
      return (
        <tr
          key={customer._id}
          className={`${
            i % 2 === 0
              ? `
                bg-slate-100
                dark:bg-slate-600
            `
              : `
                bg-slate-200
                dark:bg-slate-700
            `
          }`}
        >
          <td className={'text-left pl-6'}>{customer.firstName}</td>
          <td className={'text-left p-2'}>{customer.lastName}</td>
          <td className={'text-left p-2'}>{customer.email}</td>
          <td className={'text-left p-2'}>{customer.address}</td>
          <td className={'text-left p-2'}>{customer.phone}</td>
          <td className={'text-left p-2'}>{`${
            customer.birthDate.split('-')[2]
          }/${customer.birthDate.split('-')[1]}/${
            customer.birthDate.split('-')[0]
          }`}</td>
          {renderActions(customer)}
        </tr>
      )
    })
  }

  function renderActions(customer: CustomerInterface) {
    return (
      <td className={'text-right pr-6 '}>
        <button
          onClick={() => selectCustomer(customer)}
          className={`
                    text-green-600 hover:text-green-800 
                    dark:text-green-500 dark:hover:text-green-700 
                    rounded-full mr-2
                `}
        >
          {editIcon}
        </button>
        <button
          onClick={() => deleteCustomer(customer)}
          className={`
                    text-red-600 hover:text-red-800 
                    dark:text-red-500 dark:hover:text-red-700
                    rounded-full ml-2
                `}
        >
          {deleteIcon}
        </button>
      </td>
    )
  }

  return (
    <div className={`${mode === 'table' ? '' : 'hidden'}`}>
      <table
        className={
          'w-full rounded-xl overflow-hidden text-slate-900 dark:text-slate-300'
        }
      >
        <thead
          className={`
                    bg-slate-300 dark:bg-slate-900 
                    `}
        >
          {renderHeader()}
        </thead>
        <tbody>{renderData()}</tbody>
      </table>
    </div>
  )
}
