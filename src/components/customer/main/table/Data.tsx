import { CustomerInterface } from '@interfaces/customerInterface'
import { Dispatch, SetStateAction } from 'react'
import Actions from './Actions'

interface DataInterface {
  customer: CustomerInterface
  index: number
  selectCustomer: (customer: CustomerInterface) => void
  deleteCustomer: (customer: CustomerInterface) => void
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
}

export default function Data({
  customer,
  index,
  selectCustomer,
  deleteCustomer,
  deleteMessage,
  setDeleteMessage,
}: DataInterface) {
  return (
    <tr
      key={customer._id}
      className={`${
        index % 2 === 0
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
      <td className={'text-left p-1 pl-4'}>{customer.firstName}</td>
      <td className={'text-left p-1'}>{customer.lastName}</td>
      <td className={'text-left p-1'}>{customer.email}</td>
      <td className={'text-left p-1'}>{customer.address}</td>
      <td className={'text-left p-1'}>{customer.phone}</td>
      <td className={'text-left p-1'}>{`${customer.birthDate.split('-')[2]}/${
        customer.birthDate.split('-')[1]
      }/${customer.birthDate.split('-')[0]}`}</td>
      <Actions
        customer={customer}
        deleteCustomer={deleteCustomer}
        selectCustomer={selectCustomer}
        deleteMessage={deleteMessage}
        setDeleteMessage={setDeleteMessage}
      />
    </tr>
  )
}
