import { deleteIcon, editIcon, queueList, searchIcon } from '@components/icons'
import { RiskInterface } from '@interfaces/riskInterfaces'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'

interface ActionsInterface {
  projectID: string
  selectRisk: (risk: RiskInterface) => void
  deleteRisk: (risk: RiskInterface) => void
  risk: RiskInterface
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
}

export default function Actions({
  projectID,
  selectRisk,
  deleteRisk,
  risk,
  deleteMessage,
  setDeleteMessage,
}: ActionsInterface) {
  const router = useRouter()

  const [isClicked, setIsClicked] = useState(false)
  function deleteRiskClick() {
    if (deleteMessage) {
      setDeleteMessage(null)
      deleteRisk(risk)
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
      <div className={'flex flex-col'}>
        <div className={'flex justify-end'}>
          <button
            onClick={() =>
              router.push(`/projects/${projectID}/risks/${risk._id}`)
            }
            className={`
                        text-violet-600 hover:bg-slate-300 hover:text-violet-700
                        dark:text-violet-400 dark:hover:bg-slate-700 dark:hover:text-violet-200 p-1
                    `}
          >
            <div className={'flex'}>
              <span className={'mr-1'}>{searchIcon}</span>
              <span>Ver</span>
            </div>
          </button>
          <button
            onClick={() => selectRisk(risk)}
            className={`
                        text-sky-600 hover:bg-slate-300 hover:text-sky-700
                        dark:text-sky-500 dark:hover:bg-slate-700 dark:hover:text-sky-300 p-1
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
            onClick={() =>
              router.push(`/projects/${projectID}/risks/${risk._id}/tasks`)
            }
            className={`
                        text-teal-600 hover:bg-slate-300 hover:text-teal-700
                        dark:text-teal-500 dark:hover:bg-slate-700 dark:hover:text-teal-300 p-1
                    `}
          >
            <div className={'flex'}>
              <span className={'mr-1'}>{queueList}</span>
              <span>Tarefas</span>
            </div>
          </button>
          <button
            onClick={deleteRiskClick}
            className={`
                        text-red-600 hover:bg-slate-300 hover:text-red-700 ${
                          isClicked
                            ? 'bg-slate-300 dark:bg-slate-800 text-red-700 dark:text-red-300'
                            : ''
                        }
                        dark:text-red-500 dark:hover:bg-slate-700 dark:hover:text-red-300 p-1
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
