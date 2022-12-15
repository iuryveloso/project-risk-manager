import { deleteIcon, editIcon, searchIcon } from '@components/icons'
import { ProjectInterface } from '@interfaces/projectInterfaces'
import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'

interface ActionsInterface {
  selectProject: (project: ProjectInterface) => void
  deleteProject: (project: ProjectInterface) => void
  project: ProjectInterface
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
}

export default function Actions({
  selectProject,
  deleteProject,
  project,
  deleteMessage,
  setDeleteMessage,
}: ActionsInterface) {
  const [isClicked, setIsClicked] = useState(false)
  function deleteProjectClick() {
    if (deleteMessage) {
      setDeleteMessage(null)
      deleteProject(project)
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
      <div className={'flex flex-col justify-end'}>
        <div className={'flex justify-end items-center'}>
          <Link href={`/projects/${project._id}`}>
            <button
              className={`
                          text-violet-600 hover:bg-slate-300 hover:text-violet-700 rounded-lg
                          dark:text-violet-400 dark:hover:bg-slate-800 dark:hover:text-violet-200 py-1 px-2
                      `}
            >
              <div className={'flex'}>
                <span className={'mr-1'}>{searchIcon}</span>
                <span>Ver</span>
              </div>
            </button>
          </Link>
          {project.functionProject === 'manager' ? (
            <button
              onClick={() => selectProject(project)}
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
          ) : (
            false
          )}
        </div>
        <div className={'flex justify-end'}>
          {project.functionProject === 'manager' ? (
            <button
              onClick={deleteProjectClick}
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
          ) : (
            false
          )}
        </div>
      </div>
    </td>
  )
}
