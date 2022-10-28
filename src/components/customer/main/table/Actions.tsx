import { deleteIcon, editIcon } from '@components/icons'
import { CustomerInterface } from '@interfaces/customerInterface'
import { Dispatch, SetStateAction, useState } from 'react'

interface ActionsInterface {
  selectCustomer: (customer: CustomerInterface) => void
  deleteCustomer: (customer: CustomerInterface) => void
  customer: CustomerInterface
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
}

export default function Actions({
  selectCustomer,
  deleteCustomer,
  customer,
  deleteMessage,
  setDeleteMessage,
}: ActionsInterface) {
  const [isClicked, setIsClicked] = useState(false)
  function deleteCustomerClick() {
    if (deleteMessage) {
      setDeleteMessage(null)
      deleteCustomer(customer)
    } else {
      setDeleteMessage('Clique novamente para excluir o item')
      setIsClicked(true)
      setTimeout(() => {
        setDeleteMessage(null)
        setIsClicked(false)
      }, 3000)
    }
  }
  return (
    <td className={'text-right pr-4'}>
      <div className={'flex  justify-end items-center'}>
        <button
          onClick={() => selectCustomer(customer)}
          className={`
                      text-sky-600 hover:bg-slate-300 hover:text-sky-700
                      dark:text-sky-500 dark:hover:bg-slate-800 dark:hover:text-sky-300 py-1
                  `}
        >
          {editIcon}
        </button>
        <button
          onClick={deleteCustomerClick}
          className={`
                      text-red-600 hover:bg-slate-300 hover:text-red-700 ${
                        isClicked
                          ? 'bg-slate-300 dark:bg-slate-800 text-red-700 dark:text-red-300'
                          : ''
                      }
                      dark:text-red-500 dark:hover:bg-slate-800 dark:hover:text-red-300 p-1
                  `}
        >
          {deleteIcon}
        </button>
      </div>
    </td>
  )
}
