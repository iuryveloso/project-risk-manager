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
    <tr>
      <th className={'px-1 pl-4'}>
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
          tag={'Descrição'}
          column={'description'}
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
          tag={'Causas'}
          column={'causes'}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
        />
      </th>
      <th className={'px-1'}>
        <HeadItem
          tag={'Observações'}
          column={'observations'}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
        />
      </th>
      <th className={'text-center pr-4'}>Ações</th>
    </tr>
  )
}
