import {
  alertCircleIcon,
  deleteIcon,
  editIcon,
  queueList,
  searchIcon,
} from '@components/icons'
import { TaskInterface } from '@interfaces/taskInterfaces'
import Link from 'next/link'
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
      <div className={'flex flex-col justify-center'}>
        <div className={'flex justify-end'}>
          <Link
            href={`/projects/${projectID}/tasks/${task._id}/${
              typeTask || '2'
            }/view`}
          >
            <button
              className={`
                  text-violet-600 hover:bg-slate-300 hover:text-violet-700 rounded-lg
                  dark:text-violet-400 dark:hover:bg-slate-800 dark:hover:text-violet-300 py-1 px-2
              `}
            >
              <div className={'flex'}>
                <span className={'mr-1'}>{searchIcon}</span>
                <span>Ver</span>
              </div>
            </button>
          </Link>
          <Link href={`/projects/${projectID}/tasks/${task._id}`}>
            <button
              className={`
                          text-teal-600 hover:bg-slate-300 hover:text-teal-700 rounded-lg
                          dark:text-teal-500 dark:hover:bg-slate-800 dark:hover:text-teal-300 py-1 px-2
                      `}
            >
              <div className={'flex'}>
                <span className={'mr-1'}>{queueList}</span>
                <span>Subtarefas</span>
              </div>
            </button>
          </Link>
          <button
            onClick={() => selectTask(task)}
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
          <Link
            href={`/projects/${projectID}/tasks/${task._id}/${
              typeTask || '2'
            }/risks`}
          >
            <button
              className={`
                          text-amber-600 hover:bg-slate-300 hover:text-amber-700 rounded-lg
                          dark:text-amber-500 dark:hover:bg-slate-800 dark:hover:text-amber-300 py-1 px-2
                      `}
            >
              <div className={'flex'}>
                <span className={'mr-1'}>{alertCircleIcon}</span>
                <span>Riscos</span>
              </div>
            </button>
          </Link>
          <button
            onClick={deleteTaskClick}
            className={`
                        text-red-600 hover:bg-slate-300 hover:text-red-700 rounded-lg ${
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
