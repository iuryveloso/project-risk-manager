import { deleteIcon, editIcon, searchIcon } from '@components/icons'
import { ProjectInterface } from '@interfaces/projectInterfaces'
import { useRouter } from 'next/router'
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
  const router = useRouter()

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
      <div className={'flex flex-col  justify-center items-center'}>
        <button
          onClick={() => router.push(`/projects/${project._id}`)}
          className={`
                      text-violet-600 hover:bg-slate-300 hover:text-violet-700
                      dark:text-violet-400 dark:hover:bg-slate-800 dark:hover:text-violet-200 p-1
                  `}
        >
          <div className={'flex'}>
            <span className={'mr-1'}>{searchIcon}</span>
            <span>Ver</span>
          </div>
        </button>
        <button
          onClick={() => selectProject(project)}
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
        <button
          onClick={deleteProjectClick}
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
    </td>
  )
}
