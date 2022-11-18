import {
  alertCircleIcon,
  deleteIcon,
  editIcon,
  queueList,
} from '@components/icons'
import { TaskInterface } from '@interfaces/taskInterfaces'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'

interface ActionsInterface {
  selectTask: (task: TaskInterface) => void
  deleteTask: (task: TaskInterface) => void
  task: TaskInterface
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
  projectID: string
  typeTask?: string
}

export default function Actions({
  selectTask,
  deleteTask,
  task,
  deleteMessage,
  setDeleteMessage,
  projectID,
  typeTask,
}: ActionsInterface) {
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()
  function deleteTaskClick() {
    if (deleteMessage) {
      setDeleteMessage(null)
      deleteTask(task)
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
      <div className={'flex flex-col  justify-center items-center'}>
        <div className={'flex'}>
          <button
            onClick={() =>
              router.push(`/projects/${projectID}/tasks/${task._id}`)
            }
            className={`
                        text-teal-600 hover:bg-slate-300 hover:text-teal-700
                        dark:text-teal-500 dark:hover:bg-slate-800 dark:hover:text-teal-300 p-1
                    `}
          >
            <div className={'flex'}>
              <span className={'mr-1'}>{queueList}</span>
              <span>Subtarefas</span>
            </div>
          </button>
          <button
            onClick={() => selectTask(task)}
            className={`
                        text-sky-600 hover:bg-slate-300 hover:text-sky-700
                        dark:text-sky-500 dark:hover:bg-slate-800 dark:hover:text-sky-300 p-1
                    `}
          >
            <div className={'flex'}>
              <span className={'mr-1'}>{editIcon}</span>
              <span>Editar</span>
            </div>
          </button>
        </div>
        <div className={'flex'}>
          <button
            onClick={() =>
              router.push(
                `/projects/${projectID}/tasks/${task._id}/${
                  typeTask || '2'
                }/risks`
              )
            }
            className={`
                        text-amber-600 hover:bg-slate-300 hover:text-amber-700
                        dark:text-amber-500 dark:hover:bg-slate-800 dark:hover:text-amber-300 p-1
                    `}
          >
            <div className={'flex'}>
              <span className={'mr-1'}>{alertCircleIcon}</span>
              <span>Riscos</span>
            </div>
          </button>
          <button
            onClick={deleteTaskClick}
            className={`
                        text-red-600 hover:bg-slate-300 hover:text-red-700 ${
                          isClicked
                            ? 'bg-slate-300 dark:bg-slate-800 text-red-700 dark:text-red-300'
                            : ''
                        }
                        dark:text-red-500 dark:hover:bg-slate-800 dark:hover:text-red-300 p-1
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
