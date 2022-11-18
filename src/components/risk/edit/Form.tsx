import { Dispatch, SetStateAction } from 'react'
import { RiskInterface } from '@interfaces/riskInterfaces'
import ChartPI from '@components/risk/ChartPI'

interface FormInterface {
  mode: 'main' | 'create' | 'edit'
  risk: RiskInterface
  setRisk: Dispatch<SetStateAction<RiskInterface>>
  saveRisk: (risk: RiskInterface) => void
  getChartLevel: (
    impact: number,
    probability: number,
    type: 'negative' | 'positive'
  ) => {
    label: string
    hexColor: string
  }
}

export default function Form({
  mode,
  risk,
  setRisk,
  saveRisk,
  getChartLevel,
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
        <div className={'flex mb-4'}>
          <div className={'flex flex-col w-1/2 mr-1'}>
            <label>Impacto de Ameaça</label>
            <div className={'flex'}>
              <input
                type={'range'}
                min={'0'}
                max={'100'}
                value={risk.impactNegative}
                onChange={(value) =>
                  setRisk({
                    ...risk,
                    impactNegative: +value.target.value,
                  })
                }
                onKeyPress={(e) => {
                  return e.key === 'Enter' ? saveRisk(risk) : false
                }}
                className={'flex-grow'}
              />
              <label className={'flex items-center mx-2 text-2xl'}>
                {risk.impactNegative}
              </label>
            </div>
          </div>
          <div className={'flex flex-col w-1/2 ml-1'}>
            <label>Impacto de Oportunidade</label>
            <div className={'flex'}>
              <input
                type={'range'}
                min={'0'}
                max={'100'}
                value={risk.impactPositive}
                onChange={(value) =>
                  setRisk({
                    ...risk,
                    impactPositive: +value.target.value,
                  })
                }
                onKeyPress={(e) => {
                  return e.key === 'Enter' ? saveRisk(risk) : false
                }}
                className={'flex-grow'}
              />
              <label className={'flex items-center mx-2 text-2xl'}>
                {risk.impactPositive}
              </label>
            </div>
          </div>
        </div>
        <div className={'flex mb-4'}>
          <div className={'flex flex-col w-1/2 mr-1'}>
            <label>Probabilidade de Ameaça</label>
            <div className={'flex'}>
              <input
                type={'range'}
                min={'0'}
                max={'100'}
                value={risk.probabilityNegative}
                onChange={(value) =>
                  setRisk({
                    ...risk,
                    probabilityNegative: +value.target.value,
                  })
                }
                onKeyPress={(e) => {
                  return e.key === 'Enter' ? saveRisk(risk) : false
                }}
                className={'flex-grow'}
              />
              <label className={'flex items-center mx-2 text-2xl'}>
                {risk.probabilityNegative}
              </label>
            </div>
          </div>
          <div className={'flex flex-col w-1/2 ml-1'}>
            <label>Probabilidade de Oportunidade</label>
            <div className={'flex'}>
              <input
                type={'range'}
                min={'0'}
                max={'100'}
                value={risk.probabilityPositive}
                onChange={(value) =>
                  setRisk({
                    ...risk,
                    probabilityPositive: +value.target.value,
                  })
                }
                onKeyPress={(e) => {
                  return e.key === 'Enter' ? saveRisk(risk) : false
                }}
                className={'flex-grow'}
              />
              <label className={'flex items-center mx-2 text-2xl'}>
                {risk.probabilityPositive}
              </label>
            </div>
          </div>
        </div>
        <div className={'flex flex-col'}>
          <h1 className={'flex justify-center text-2xl font-bold'}>
            Matrizes de Probabilidade x Impacto
          </h1>
          <div className={'flex mb-1'}>
            <div className={'w-1/2 justify-center'}>
              <h2 className={'flex justify-center text-xl font-bold'}>
                Ameaça
              </h2>
            </div>
            <div className={'w-1/2 justify-center'}>
              <h2 className={'flex justify-center text-xl font-bold'}>
                Oportunidade
              </h2>
            </div>
          </div>
        </div>
        <div className={'flex'}>
          <div className={'w-1/2'}>
            <div className={'mr-1'}>
              <ChartPI
                getChartLevel={getChartLevel}
                impact={risk.impactNegative}
                probability={risk.probabilityNegative}
                type={'negative'}
              />
            </div>
          </div>
          <div className={'w-1/2 -mr-1'}>
            <div className={'ml-1'}>
              <ChartPI
                getChartLevel={getChartLevel}
                impact={risk.impactPositive}
                probability={risk.probabilityPositive}
                type={'positive'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
