import { Dispatch, SetStateAction } from 'react'
import { ActionInterface } from '@interfaces/actionInterfaces'

interface FormInterface {
  mode: 'main' | 'create' | 'edit' | 'view'
  action: ActionInterface
  setAction: Dispatch<SetStateAction<ActionInterface>>
  saveAction: (action: ActionInterface) => void
}

export default function Form({
  mode,
  action,
  setAction,
  saveAction,
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
        ${mode === 'create' ? '' : 'hidden'}
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
            value={action.title}
            placeholder={'ex: João'}
            onChange={(value) =>
              setAction({ ...action, title: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveAction(action) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Descrição</label>
          <input
            type={'text'}
            value={action.description}
            placeholder={'ex: Oliveira'}
            onChange={(value) =>
              setAction({ ...action, description: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveAction(action) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Tipo</label>
          <input
            type={'text'}
            value={action.type}
            placeholder={'ex: Oliveira'}
            onChange={(value) =>
              setAction({ ...action, type: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveAction(action) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Responsável</label>
          <input
            type={'text'}
            value={action.responsible}
            placeholder={'ex: Oliveira'}
            onChange={(value) =>
              setAction({ ...action, responsible: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveAction(action) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Status</label>
          <input
            type={'text'}
            value={action.status}
            placeholder={'ex: Oliveira'}
            onChange={(value) =>
              setAction({ ...action, status: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveAction(action) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Observação</label>
          <input
            type={'text'}
            value={action.observation}
            placeholder={'ex: Oliveira'}
            onChange={(value) =>
              setAction({ ...action, observation: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveAction(action) : false
            }}
            className={classNameInput}
          />
        </div>
      </div>
    </div>
  )
}
