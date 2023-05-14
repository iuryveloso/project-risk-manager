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
  const classNameMoneyInput = `
  flex-grow px-3 py-2 rounded-r-lg border focus:outline-none my-1
  bg-slate-100 dark:bg-slate-600
  border-slate-500 dark:border-slate-200
  text-slate-900 dark:text-slate-100
  focus:bg-white dark:focus:bg-slate-500 
  focus:border-indigo-700 dark:focus:border-indigo-600 
  `
  const classNameLabel = `
    rounded-l-lg px-3 py-2 my-1
    bg-slate-600 text-slate-200 dark:bg-slate-200 dark:text-slate-800
    border-y border-r border-slate-600 dark:border-slate-200
  `
  return (
    <>
      {mode === 'edit' ? (
        <div className={`flex flex-col justify-center`}>
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
                onChange={(e) =>
                  setAction({ ...action, title: e.target.value })
                }
                onKeyDown={(e) => {
                  return e.key === 'Enter' ? saveAction(action) : false
                }}
                className={classNameInput}
              />
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Descrição</label>
              <textarea
                rows={3}
                value={action.description}
                onChange={(e) =>
                  setAction({ ...action, description: e.target.value })
                }
                className={`${classNameInput} scrollbar dark:scrollbar-dark`}
              />
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Tipo de Abordagem</label>
              <select
                value={action.type}
                onChange={(e) => {
                  if (
                    e.target.value === 'Ameaça' ||
                    e.target.value === 'Oportunidade'
                  )
                    setAction({ ...action, type: e.target.value })
                }}
                onKeyDown={(e) => {
                  return e.key === 'Enter' ? saveAction(action) : false
                }}
                className={classNameInput}
              >
                <option value={'Ameaça'}>Ameaça</option>
                <option value={'Oportunidade'}>Oportunidade</option>
              </select>
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Responsável</label>
              <input
                type={'text'}
                value={action.responsible}
                onChange={(e) =>
                  setAction({ ...action, responsible: e.target.value })
                }
                onKeyDown={(e) => {
                  return e.key === 'Enter' ? saveAction(action) : false
                }}
                className={classNameInput}
              />
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Status</label>
              <select
                value={action.status}
                onChange={(e) => {
                  if (
                    e.target.value === 'Pendente' ||
                    e.target.value === 'Em Andamento' ||
                    e.target.value === 'Concluído'
                  )
                    setAction({ ...action, status: e.target.value })
                }}
                onKeyDown={(e) => {
                  return e.key === 'Enter' ? saveAction(action) : false
                }}
                className={classNameInput}
              >
                <option value={'Pendente'}>Pendente</option>
                <option value={'Em Andamento'}>Em Andamento</option>
                <option value={'Concluído'}>Concluído</option>
              </select>
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Custo</label>
              <div className={'flex'}>
                <label className={classNameLabel}>R$</label>
                <input
                  type={'number'}
                  value={action.cost}
                  onChange={(e) =>
                    setAction({ ...action, cost: +e.target.value })
                  }
                  onKeyDown={(e) => {
                    return e.key === 'Enter' ? saveAction(action) : false
                  }}
                  className={classNameMoneyInput}
                />
              </div>
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Observação</label>
              <input
                type={'text'}
                value={action.observation}
                onChange={(e) =>
                  setAction({ ...action, observation: e.target.value })
                }
                onKeyDown={(e) => {
                  return e.key === 'Enter' ? saveAction(action) : false
                }}
                className={classNameInput}
              />
            </div>
          </div>
        </div>
      ) : (
        false
      )}
    </>
  )
}
