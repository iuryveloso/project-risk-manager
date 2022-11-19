import { deleteIcon, editIcon, searchIcon } from '@components/icons'
import { ActionInterface } from '@interfaces/actionInterfaces'
import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'

interface ActionsInterface {
  selectAction: (action: ActionInterface) => void
  deleteAction: (action: ActionInterface) => void
  action: ActionInterface
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
  projectID: string
  riskID: string
}

export default function Actions({
  selectAction,
  deleteAction,
  action,
  deleteMessage,
  setDeleteMessage,
  projectID,
  riskID,
}: ActionsInterface) {
  const [isClicked, setIsClicked] = useState(false)
  function deleteActionClick() {
    if (deleteMessage) {
      setDeleteMessage(null)
      deleteAction(action)
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
      <div className={'flex flex-col  justify-center items-end'}>
        <div className={'flex justify-end'}>
          <Link
            href={`/projects/${projectID}/risks/${riskID}/actions/${action._id}`}
          >
            <button
              className={`
                      text-violet-600 hover:bg-slate-300 hover:text-violet-700 rounded-lg
                      dark:text-violet-500 dark:hover:bg-slate-800 dark:hover:text-violet-300 py-1 px-2
                      `}
            >
              <div className={'flex'}>
                <span className={'mr-2'}>{searchIcon}</span>
                <span>Ver</span>
              </div>
            </button>
          </Link>
          <button
            onClick={() => selectAction(action)}
            className={`
                        text-sky-600 hover:bg-slate-300 hover:text-sky-700 rounded-lg
                        dark:text-sky-500 dark:hover:bg-slate-800 dark:hover:text-sky-300 py-1 px-2
                    `}
          >
            <div className={'flex'}>
              <span className={'mr-1'}>{editIcon}</span>
              <span>Editar</span>
            </div>
          </button>
        </div>
        <div className={'flex justify-end'}>
          <button
            onClick={deleteActionClick}
            className={`
                        text-red-600 hover:bg-slate-300 hover:text-red-700  rounded-lg ${
                          isClicked
                            ? 'bg-slate-300 dark:bg-slate-800 text-red-700 dark:text-red-300'
                            : ''
                        }
                        dark:text-red-500 dark:hover:bg-slate-800 dark:hover:text-red-300 py-1 px-2
                    `}
          >
            <div className={'flex'}>
              <span className={'mr-1'}>{deleteIcon}</span>
              <span>Excluir</span>
            </div>
          </button>
        </div>
      </div>
    </td>
  )
}
