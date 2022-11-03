import { Dispatch, SetStateAction } from 'react'
import HeadItem from '@components/customer/main/table/HeadItem'
import { OrderInterface } from '@interfaces/customerInterfaces'

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
      <th className={'text-left px-1 pl-4'}>
        <HeadItem
          tag={'Nome'}
          column={'firstName'}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
        />
      </th>
      <th className={'text-left px-1'}>
        <HeadItem
          tag={'Sobrenome'}
          column={'lastName'}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
        />
      </th>
      <th className={'text-left px-1'}>
        <HeadItem
          tag={'Email'}
          column={'email'}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
        />
      </th>
      <th className={'text-left px-1'}>
        <HeadItem
          tag={'Endereço'}
          column={'address'}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
        />
      </th>
      <th className={'text-left px-1'}>
        <HeadItem
          tag={'Telefone'}
          column={'phone'}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
        />
      </th>
      <th className={'text-left px-1'}>
        <HeadItem
          tag={'Data de Nascimento'}
          column={'birthDate'}
          order={order}
          orderBy={orderBy}
          setOrder={setOrder}
        />
      </th>
      <th className={'text-center pr-4'}>Ações</th>
    </tr>
  )
}
