import { Dispatch, SetStateAction } from 'react'
import { RiskInterface } from '@interfaces/riskInterfaces'

interface FormInterface {
  mode: 'main' | 'create' | 'edit' | 'task'
  risk: RiskInterface
  setRisk: Dispatch<SetStateAction<RiskInterface>>
  saveRisk: (risk: RiskInterface) => void
}

export default function Form({ mode, risk, setRisk, saveRisk }: FormInterface) {
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
            value={risk.title}
            placeholder={'ex: João'}
            onChange={(value) =>
              setRisk({ ...risk, title: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveRisk(risk) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Descrição</label>
          <input
            type={'text'}
            value={risk.description}
            placeholder={'ex: Oliveira'}
            onChange={(value) =>
              setRisk({ ...risk, description: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveRisk(risk) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Categoria</label>
          <input
            type={'text'}
            value={risk.category}
            placeholder={'ex: Oliveira'}
            onChange={(value) =>
              setRisk({ ...risk, category: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveRisk(risk) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Causas</label>
          <input
            type={'text'}
            value={risk.causes}
            placeholder={'ex: Oliveira'}
            onChange={(value) =>
              setRisk({ ...risk, causes: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveRisk(risk) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Observações</label>
          <input
            type={'text'}
            value={risk.observations}
            placeholder={'ex: Oliveira'}
            onChange={(value) =>
              setRisk({ ...risk, observations: value.target.value })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveRisk(risk) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Probabilidade</label>
          <input
            type={'number'}
            value={risk.probability}
            placeholder={'ex: Oliveira'}
            onChange={(value) =>
              setRisk({ ...risk, probability: parseFloat(value.target.value) })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveRisk(risk) : false
            }}
            className={classNameInput}
          />
        </div>
        <div className={'flex flex-col mb-4'}>
          <label>Impacto</label>
          <input
            type={'number'}
            value={risk.impact}
            placeholder={'ex: Oliveira'}
            onChange={(value) =>
              setRisk({ ...risk, impact: parseFloat(value.target.value) })
            }
            onKeyPress={(e) => {
              return e.key === 'Enter' ? saveRisk(risk) : false
            }}
            className={classNameInput}
          />
        </div>
      </div>
    </div>
  )
}
