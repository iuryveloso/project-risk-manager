import { ActionInterface } from '@interfaces/actionInterfaces'
import { RiskInterface } from '@interfaces/riskInterfaces'

interface ExportRiskInteface {
  risks: RiskInterface[]
  actions: ActionInterface[]
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
  getChartLevel,
}: ExportRiskInteface) {
  function getActionsFromRisk(risk: RiskInterface) {
    return actions.filter((action) =>
      action.riskID?.includes(risk._id as string)
    )
  }
  return (
    <div style={{ width: '34rem' }}>
      <div className={'mt-5 text-black'}>
        <div className={'flex justify-center mb-3'}>
          <h3 className={'text-xl'}>Riscos</h3>
        </div>
        {risks.map((risk, index) => {
          return (
            <ul
              key={index}
              className={'flex flex-col mb-4 border border-black px-2'}
            >
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>{index + 1}ª Risco:</label>
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
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>Nível de Ameça: </label>
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
                <label className={'font-bold mx-2'}>
                  Nível de Oportunidade:
                </label>
                <span
                  className={'text-justify'}
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
              </li>
              <li className={'flex text-xs mb-5'}>
                <label className={'font-bold mr-2'}>Ações: </label>
                <div className={'flex flex-col'}>
                  {getActionsFromRisk(risk).map((action, index) => (
                    <div key={index}>{action.title}</div>
                  ))}
                </div>
              </li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}
