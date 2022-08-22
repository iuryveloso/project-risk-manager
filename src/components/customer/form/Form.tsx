import { Dispatch, SetStateAction } from 'react'
import { CustomerInterface } from '@interfaces/customerInterface'

interface FormInterface {
  mode: 'table' | 'form'
  customer: CustomerInterface
  setCustomer: Dispatch<SetStateAction<CustomerInterface>>
  saveCustomer: (customer: CustomerInterface) => void
}

export default function Form({
  mode,
  customer,
  setCustomer,
  saveCustomer,
}: FormInterface) {
  const classNameInput = `
  px-3 py-2 rounded-lg border focus:outline-none my-1
  bg-slate-100 dark:bg-slate-600
  border-slate-500 dark:border-slate-200
  text-slate-900 dark:text-slate-100
  focus:bg-white dark:focus:bg-slate-500 
  focus:border-indigo-700 dark:focus:border-indigo-600 
  `
  return (
    <div
      className={`
        flex flex-col justify-center
        ${mode === 'form' ? '' : 'hidden'}
    `}
    >
      <div
        className={`
            w-full
            flex-grow
            bg-slate-200 dark:bg-slate-700 p-4 
        `}
      >
        <div className={'flex flex-col mb-4'}>
          <label>Nome</label>
          <input
            type={'text'}
            value={customer.firstName}
            placeholder={'ex: João'}
            onChange={(value) =>
              setCustomer({ ...customer, firstName: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveCustomer(customer) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Sobrenome</label>
          <input
            type={'text'}
            value={customer.lastName}
            placeholder={'ex: Oliveira'}
            onChange={(value) =>
              setCustomer({ ...customer, lastName: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveCustomer(customer) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Email</label>
          <input
            type={'email'}
            value={customer.email}
            placeholder={'ex: joao.oliveira@gmail.com'}
            onChange={(value) =>
              setCustomer({ ...customer, email: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveCustomer(customer) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Endereço</label>
          <input
            type={'text'}
            value={customer.address}
            placeholder={
              'ex: Rua dos Bobos, nº 0, Bairro Fictício, Cidade Invisível - SS'
            }
            onChange={(value) =>
              setCustomer({ ...customer, address: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveCustomer(customer) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Telefone</label>
          <input
            type={'text'}
            value={customer.phone}
            placeholder={'ex: (11) 91234-5678'}
            onChange={(value) =>
              setCustomer({ ...customer, phone: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveCustomer(customer) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Data de Nascimento</label>
          <input
            type={'date'}
            value={customer.birthDate}
            placeholder={'ex: 11/11/2001'}
            onChange={(value) =>
              setCustomer({ ...customer, birthDate: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveCustomer(customer) : false
            }}
            className={classNameInput}
          />
        </div>
      </div>
    </div>
  )
}
