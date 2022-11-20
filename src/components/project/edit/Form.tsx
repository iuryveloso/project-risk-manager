import { Dispatch, SetStateAction } from 'react'
import { ProjectInterface } from '@interfaces/projectInterfaces'

interface FormInterface {
  mode: 'main' | 'create' | 'edit' | 'view'
  project: ProjectInterface
  setProject: Dispatch<SetStateAction<ProjectInterface>>
  saveProject: (project: ProjectInterface) => void
}

export default function Form({
  mode,
  project,
  setProject,
  saveProject,
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
        ${mode === 'edit' ? '' : 'hidden'}
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
          <label>Título</label>
          <input
            type={'text'}
            value={project.title}
            onChange={(value) =>
              setProject({ ...project, title: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveProject(project) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Descrição</label>
          <textarea
            rows={3}
            value={project.description}
            onChange={(value) =>
              setProject({ ...project, description: value.target.value })
            }
            className={`${classNameInput} scrollbar dark:scrollbar-dark`}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Área de Atuação</label>
          <input
            type={'text'}
            value={project.occupationArea}
            onChange={(value) =>
              setProject({ ...project, occupationArea: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveProject(project) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Início</label>
          <input
            type={'date'}
            value={project.begin}
            onChange={(value) =>
              setProject({ ...project, begin: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveProject(project) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Término</label>
          <input
            type={'date'}
            value={project.end}
            onChange={(value) =>
              setProject({ ...project, end: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveProject(project) : false
            }}
            className={classNameInput}
          />
        </div>
      </div>
    </div>
  )
}