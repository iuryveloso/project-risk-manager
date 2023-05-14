import { Dispatch, SetStateAction } from 'react'
import { RiskInterface } from '@interfaces/riskInterfaces'
import ChartPI from '@components/risk/ChartPI'

interface FormInterface {
  mode: 'main' | 'create' | 'edit'
  functionProject: 'manager' | 'collaborator'
  risk: RiskInterface
  setRisk: Dispatch<SetStateAction<RiskInterface>>
  higherImpacts: {
    negative: number
    positive: number
  }
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
  functionProject,
  risk,
  setRisk,
  saveRisk,
  higherImpacts,
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
  const classNameMoneyInput = `
  flex-grow px-3 py-2  rounded-r-lg border focus:outline-none my-1
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
                value={risk.title}
                onChange={(e) => setRisk({ ...risk, title: e.target.value })}
                onKeyDown={(e) => {
                  return e.key === 'Enter' ? saveRisk(risk) : false
                }}
                className={classNameInput}
              />
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Descrição</label>
              <textarea
                rows={3}
                value={risk.description}
                onChange={(e) =>
                  setRisk({ ...risk, description: e.target.value })
                }
                className={`${classNameInput} scrollbar dark:scrollbar-dark`}
              />
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Categoria</label>
              <select
                value={risk.category}
                onChange={(e) => {
                  if (
                    e.target.value === 'Gestão do Projeto' ||
                    e.target.value === 'Técnico' ||
                    e.target.value === 'Organizacional' ||
                    e.target.value === 'Externo'
                  )
                    setRisk({ ...risk, category: e.target.value })
                }}
                onKeyDown={(e) => {
                  return e.key === 'Enter' ? saveRisk(risk) : false
                }}
                className={classNameInput}
              >
                <option value={'Gestão do Projeto'}>Gestão do Projeto</option>
                <option value={'Técnico'}>Técnico</option>
                <option value={'Organizacional'}>Organizacional</option>
                <option value={'Externo'}>Externo</option>
              </select>
            </div>
            <div className={'flex flex-col mb-4'}>
              <label>Causas</label>
              <input
                type={'text'}
                value={risk.causes}
                onChange={(e) => setRisk({ ...risk, causes: e.target.value })}
                onKeyDown={(e) => {
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
                onChange={(e) =>
                  setRisk({ ...risk, observations: e.target.value })
                }
                onKeyDown={(e) => {
                  return e.key === 'Enter' ? saveRisk(risk) : false
                }}
                className={classNameInput}
              />
            </div>
            {functionProject === 'manager' ? (
              <div className={'flex flex-col mb-4'}>
                <label>Status</label>
                <select
                  value={risk.status}
                  onChange={(e) => {
                    if (
                      e.target.value === 'Aprovado' ||
                      e.target.value === 'Em Análise' ||
                      e.target.value === 'Reprovado'
                    )
                      setRisk({ ...risk, status: e.target.value })
                  }}
                  onKeyDown={(e) => {
                    return e.key === 'Enter' ? saveRisk(risk) : false
                  }}
                  className={classNameInput}
                >
                  <option value={'Em Análise'}>Em Análise</option>
                  <option value={'Aprovado'}>Aprovado</option>
                  <option value={'Reprovado'}>Reprovado</option>
                </select>
              </div>
            ) : (
              false
            )}
            <div className={'flex flex-col'}>
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
            <div className={'flex mb-4'}>
              <div className={'flex flex-col w-1/2 mr-1'}>
                <label>Impacto</label>
                <div className={'flex'}>
                  <label className={classNameLabel}>R$</label>
                  <input
                    type={'number'}
                    value={risk.impactNegative}
                    onChange={(e) =>
                      setRisk({
                        ...risk,
                        impactNegative: +e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      return e.key === 'Enter' ? saveRisk(risk) : false
                    }}
                    className={classNameMoneyInput}
                  />
                </div>
              </div>
              <div className={'flex flex-col w-1/2 ml-1'}>
                <label>Impacto</label>
                <div className={'flex'}>
                  <label className={classNameLabel}>R$</label>
                  <input
                    type={'number'}
                    value={risk.impactPositive}
                    onChange={(e) =>
                      setRisk({
                        ...risk,
                        impactPositive: +e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      return e.key === 'Enter' ? saveRisk(risk) : false
                    }}
                    className={classNameMoneyInput}
                  />
                </div>
              </div>
            </div>
            <div className={'flex mb-4'}>
              <div className={'flex flex-col w-1/2 mr-1'}>
                <label>Probabilidade</label>
                <div className={'flex'}>
                  <input
                    type={'range'}
                    min={'0'}
                    max={'100'}
                    value={risk.probabilityNegative}
                    onChange={(e) =>
                      setRisk({
                        ...risk,
                        probabilityNegative: +e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      return e.key === 'Enter' ? saveRisk(risk) : false
                    }}
                    className={'flex-grow'}
                  />
                  <label className={'flex items-center mx-2 text-2xl'}>
                    {risk.probabilityNegative}%
                  </label>
                </div>
              </div>
              <div className={'flex flex-col w-1/2 ml-1'}>
                <label>Probabilidade</label>
                <div className={'flex'}>
                  <input
                    type={'range'}
                    min={'0'}
                    max={'100'}
                    value={risk.probabilityPositive}
                    onChange={(e) =>
                      setRisk({
                        ...risk,
                        probabilityPositive: +e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      return e.key === 'Enter' ? saveRisk(risk) : false
                    }}
                    className={'flex-grow'}
                  />
                  <label className={'flex items-center mx-2 text-2xl'}>
                    {risk.probabilityPositive}%
                  </label>
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
                    higherImpacts={higherImpacts}
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
                    higherImpacts={higherImpacts}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        false
      )}
    </>
  )
}
