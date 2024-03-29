import { Dispatch, SetStateAction } from 'react'
import HeadItem from '@components/risk/main/table/HeadItem'
import { OrderInterface } from '@interfaces/riskInterfaces'

interface HeaderInterface {
  order: OrderInterface
  setOrder: Dispatch<SetStateAction<OrderInterface>>
  orderBy: (
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) => void
}

export default function Header({ order, setOrder, orderBy }: HeaderInterface) {
  return (
    <>
      <tr>
        <th className={'px-1 pl-4 w-5/12 2xl:w-7/12'}>
          <HeadItem
            tag={'Título'}
            column={'title'}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
          />
        </th>
        <th className={'px-1'}>
          <HeadItem
            tag={'Categoria'}
            column={'category'}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
          />
        </th>
        <th className={'px-1'}>
          <HeadItem
            tag={'Ameaça'}
            column={'impactNegative'}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
          />
        </th>
        <th className={'px-1'}>
          <HeadItem
            tag={'Oportunidade'}
            column={'impactPositive'}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
          />
        </th>
        <th className={'px-1'}>
          <HeadItem
            tag={'Status'}
            column={'status'}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
          />
        </th>
        <th className={'text-end pr-6'}>Ações</th>
      </tr>
    </>
  )
}
