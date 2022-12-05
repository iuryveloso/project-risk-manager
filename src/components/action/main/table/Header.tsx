import { Dispatch, SetStateAction } from 'react'
import HeadItem from '@components/action/main/table/HeadItem'
import { OrderInterface } from '@interfaces/actionInterfaces'

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
          tag={'Tipo de Abordagem'}
          column={'type'}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
        />
      </th>
      <th className={'px-1'}>
        <HeadItem
          tag={'Responsável'}
          column={'responsible'}
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
  )
}
