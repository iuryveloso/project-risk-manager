import { ActionInterface } from '@interfaces/actionInterfaces'
import { RiskInterface } from '@interfaces/riskInterfaces'

interface ExportRiskInteface {
  risks: RiskInterface[]
  actions: ActionInterface[]
  risksCost: number
  getChartLevel: (
    impact: number,
    probability: number,
    type: 'negative' | 'positive'
  ) => {
    label: string
    hexColor: string
  }
}

export default function ExportRisk({
  risks,
  actions,
  risksCost,
  getChartLevel,
}: ExportRiskInteface) {
  function getActionsFromRisk(risk: RiskInterface) {
    return actions.filter((action) =>
      action.riskID?.includes(risk._id as string)
    )
  }
  const brazilReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  const approvedRisks = risks.filter((e) => e.status.includes('Aprovado'))
  return (
    <div style={{ width: '34rem', fontFamily: 'arial' }}>
      <div className={'mt-3 text-black'}>
        <div className={'flex justify-center mb-3'}>
          <h3 className={'text-xl'}>Riscos</h3>
        </div>
        {approvedRisks.map((risk, index) => {
          return (
            <ul
              key={index}
              className={'flex flex-col mb-4 border border-black px-2'}
            >
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>{index + 1}º Risco:</label>
                <span>{risk.title}</span>
              </li>
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>Descrição: </label>
                <div className={'flex flex-col'}>
                  {risk.description
                    .split('\n')
                    .map((descriptionLine, index) => (
                      <div key={index}>{descriptionLine}</div>
                    ))}
                </div>
              </li>
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>Categoria: </label>
                <span className={'text-justify'}>{risk.category}</span>
              </li>
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>Causas: </label>
                <span className={'text-justify'}>{risk.causes}</span>
              </li>
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>Observações: </label>
                <span className={'text-justify'}>{risk.observations}</span>
              </li>
              <li className={'flex flex-col text-xs'}>
                <label className={'font-bold mr-2'}>Ameaça: </label>
                <div className="flex ml-2">
                  <label className={'font-bold mr-2'}>Nível: </label>
                  <span
                    className={'text-justify mr-2'}
                    style={{
                      color: getChartLevel(
                        risk.impactNegative,
                        risk.probabilityNegative,
                        'negative'
                      ).hexColor,
                    }}
                  >
                    {
                      getChartLevel(
                        risk.impactNegative,
                        risk.probabilityNegative,
                        'negative'
                      ).label
                    }
                  </span>
                </div>
                <div className="flex ml-2">
                  <label className={'font-bold mr-2'}>Impacto: </label>
                  <span className={'text-justify'}>
                    {brazilReal.format(risk.impactNegative)}
                  </span>
                  <label className={'font-bold mr-2 ml-3'}>
                    Probabilidade:{' '}
                  </label>
                  <span className={'text-justify flex-grow'}>
                    {risk.probabilityNegative}%
                  </span>
                  <span
                    className={'text-justify italic'}
                    style={{
                      fontSize: '0.6rem',
                      lineHeight: '0.85rem',
                    }}
                  >
                    +{' '}
                    {brazilReal.format(
                      (risk.impactNegative * risk.probabilityNegative) / 100
                    )}
                  </span>
                </div>
              </li>
              <li className={'flex flex-col text-xs'}>
                <label className={'font-bold mr-2'}>Oportunidade: </label>
                <div className="flex ml-2">
                  <label className={'font-bold mr-2'}>Nível: </label>
                  <span
                    className={'text-justify mr-2'}
                    style={{
                      color: getChartLevel(
                        risk.impactPositive,
                        risk.probabilityPositive,
                        'positive'
                      ).hexColor,
                    }}
                  >
                    {
                      getChartLevel(
                        risk.impactPositive,
                        risk.probabilityPositive,
                        'positive'
                      ).label
                    }
                  </span>
                </div>
                <div className="flex ml-2">
                  <label className={'font-bold mr-2'}>Impacto: </label>
                  <span className={'text-justify'}>
                    {brazilReal.format(risk.impactPositive)}
                  </span>
                  <label className={'font-bold mr-2 ml-3'}>
                    Probabilidade:{' '}
                  </label>
                  <span className={'text-justify flex-grow'}>
                    {risk.probabilityPositive}%
                  </span>
                  <span
                    className={'text-justify italic'}
                    style={{
                      fontSize: '0.6rem',
                      lineHeight: '0.85rem',
                    }}
                  >
                    -{' '}
                    {brazilReal.format(
                      (risk.impactPositive * risk.probabilityPositive) / 100
                    )}
                  </span>
                </div>
              </li>
              <li className={'flex flex-col text-xs mb-5'}>
                <label className={'font-bold mr-2'}>Ações: </label>
                <div className={'flex flex-col ml-2'}>
                  {getActionsFromRisk(risk).length > 0
                    ? getActionsFromRisk(risk).map((action, index) => (
                        <div key={index} className={'flex'}>
                          <span className={'text-justify flex-grow'}>
                            {action.title}
                          </span>
                          <span
                            className={'text-justify italic'}
                            style={{
                              fontSize: '0.6rem',
                              lineHeight: '0.85rem',
                            }}
                          >
                            + {brazilReal.format(action.cost)}
                          </span>
                        </div>
                      ))
                    : 'Nenhuma'}
                </div>
              </li>
            </ul>
          )
        })}
        <hr className={'mt-3 border-t border-slate-900'} />
        <div className={'flex mb-3 text-xs'}>
          <label className={'font-bold flex-grow'}>
            Total de Custo dos Riscos:
          </label>
          <span className={'text-justify'}>{brazilReal.format(risksCost)}</span>
        </div>
      </div>
    </div>
  )
}
