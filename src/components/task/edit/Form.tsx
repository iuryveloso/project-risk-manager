import { Dispatch, SetStateAction } from 'react'
import { TaskInterface } from '@interfaces/taskInterfaces'

interface FormInterface {
  mode: 'main' | 'create' | 'edit' | 'view'
  task: TaskInterface
  setTask: Dispatch<SetStateAction<TaskInterface>>
  saveTask: (task: TaskInterface) => void
}

export default function Form({ mode, task, setTask, saveTask }: FormInterface) {
  const classNameInput = `
    px-3 py-2 rounded-lg border focus:outline-none my-1
    bg-slate-100 dark:bg-slate-600
    border-slate-500 dark:border-slate-200
    text-slate-900 dark:text-slate-100
    focus:bg-white dark:focus:bg-slate-500 
    focus:border-indigo-700 dark:focus:border-indigo-600 
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
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                onKeyDown={(e) => {
                  return e.key === 'Enter' ? saveTask(task) : false
                }}
                className={classNameInput}
              />
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Descrição</label>
              <textarea
                rows={3}
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
                className={`${classNameInput} scrollbar dark:scrollbar-dark`}
              />
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Responsável</label>
              <input
                type={'text'}
                value={task.responsible}
                onChange={(e) =>
                  setTask({ ...task, responsible: e.target.value })
                }
                onKeyDown={(e) => {
                  return e.key === 'Enter' ? saveTask(task) : false
                }}
                className={classNameInput}
              />
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Início</label>
              <input
                type={'date'}
                value={task.begin}
                onChange={(e) => setTask({ ...task, begin: e.target.value })}
                onKeyDown={(e) => {
                  return e.key === 'Enter' ? saveTask(task) : false
                }}
                className={classNameInput}
              />
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Término</label>
              <input
                type={'date'}
                value={task.end}
                onChange={(e) => setTask({ ...task, end: e.target.value })}
                onKeyDown={(e) => {
                  return e.key === 'Enter' ? saveTask(task) : false
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
