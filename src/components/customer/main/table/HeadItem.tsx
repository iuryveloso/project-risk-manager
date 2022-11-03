import { chevronDownIcon, chevronUpIcon } from '@components/icons'
import { OrderInterface } from '@interfaces/customerInterfaces'
import { Dispatch, SetStateAction } from 'react'

interface HeadItemInterface {
  tag: string
  column: OrderInterface['column']
  order: OrderInterface
  setOrder: Dispatch<SetStateAction<OrderInterface>>
  orderBy: (
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) => void
}

export default function HeadItem({
  tag,
  column,
  order,
  setOrder,
  orderBy,
}: HeadItemInterface) {
  return (
    <div className={'flex'}>
      <div className={'flex flex-col justify-center'}>
        <button
          className={
            order.column === column && order.direction === 'asc'
              ? ' text-slate-300 dark:text-slate-900'
              : ' hover:bg-slate-400 dark:hover:bg-slate-700'
          }
          onClick={(e) => {
            orderBy(column, 'asc')
            setOrder({ column, direction: 'asc' })
          }}
          disabled={order.column === column && order.direction === 'asc'}
        >
          {chevronUpIcon}
        </button>
        <button
          className={
            order.column === column && order.direction === 'desc'
              ? ' text-slate-300 dark:text-slate-900'
              : ' hover:bg-slate-400 dark:hover:bg-slate-700'
          }
          onClick={(e) => {
            orderBy(column, 'desc')
            setOrder({ column, direction: 'desc' })
          }}
          disabled={order.column === column && order.direction === 'desc'}
        >
          {chevronDownIcon}
        </button>
      </div>
      <div className={'flex items-center ml-2'}>
        <span>{tag}</span>
      </div>
    </div>
  )
}
