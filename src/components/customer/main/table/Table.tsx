import { Dispatch, SetStateAction } from 'react'
import Header from '@components/customer/main/table/Header'
import Data from '@components/customer/main/table/Data'
import {
  CustomerInterface,
  OrderInterface,
} from '@interfaces/customerInterfaces'

interface TableInterface {
  mode: 'main' | 'create' | 'edit'
  customers: CustomerInterface[]
  selectCustomer: (customer: CustomerInterface) => void
  deleteCustomer: (customer: CustomerInterface) => void
  order: OrderInterface
  setOrder: Dispatch<SetStateAction<OrderInterface>>
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
  orderBy: (
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) => void
}

export default function Table({
  mode,
  customers,
  selectCustomer,
  deleteCustomer,
  order,
  setOrder,
  orderBy,
  deleteMessage,
  setDeleteMessage,
}: TableInterface) {
  return (
    <div className={`${mode === 'main' ? '' : 'hidden'}`}>
      <table
        className={'w-full  overflow-hidden text-slate-900 dark:text-slate-300'}
      >
        <thead
          className={`
                    bg-slate-300 dark:bg-slate-900 
                    `}
        >
          <Header order={order} orderBy={orderBy} setOrder={setOrder} />
        </thead>
        <tbody>
          {customers?.map((customer, index) => {
            return (
              <Data
                key={index}
                index={index}
                customer={customer}
                deleteCustomer={deleteCustomer}
                selectCustomer={selectCustomer}
                deleteMessage={deleteMessage}
                setDeleteMessage={setDeleteMessage}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
