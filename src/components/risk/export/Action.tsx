import { ActionInterface } from '@interfaces/actionInterfaces'
import { RiskInterface } from '@interfaces/riskInterfaces'

interface ExportInteface {
  actions: ActionInterface[]
  risk: RiskInterface
}

export default function Export({ actions, risk }: ExportInteface) {
  const brazilReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  const expectedNegative =
    (risk.impactNegative * risk.probabilityNegative) / 100
  const expectedPositive =
    (risk.impactPositive * risk.probabilityPositive) / 100
  const riskCost =
    expectedNegative -
    expectedPositive +
    actions.reduce((acc, curr) => acc + curr.cost, 0)
  return (
    <div style={{ width: '34rem', fontFamily: 'arial' }}>
      <div className={'mt-3 text-black'}>
        <div className={'flex justify-center mb-3'}>
          <h3 className={'text-xl'}>Ações para o Risco</h3>
        </div>
        {actions.map((action, index) => {
          return (
            <ul
              key={index}
              className={'flex flex-col mb-4 border border-black px-2'}
            >
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>{index + 1}ª Ação:</label>
                <span>{action.title}</span>
              </li>
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>Descrição: </label>
                <div className={'flex flex-col'}>
                  {action.description
                    .split('\n')
                    .map((descriptionLine, index) => (
                      <div key={index}>{descriptionLine}</div>
                    ))}
                </div>
              </li>
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>Tipo: </label>
                <span className={'text-justify'}>{action.type}</span>
              </li>
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>Responsável: </label>
                <span className={'text-justify'}>{action.responsible}</span>
              </li>
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>Status: </label>
                <span className={'text-justify'}>{action.status}</span>
              </li>
              <li className={'flex text-xs'}>
                <label className={'font-bold mr-2'}>Custo: </label>
                <span className={'text-justify flex-grow'}>
                  {brazilReal.format(action.cost)}
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
              </li>
              <li className={'flex text-xs mb-5'}>
                <label className={'font-bold mr-2'}>Observação: </label>
                <span className={'text-justify'}>{action.observation}</span>
              </li>
            </ul>
          )
        })}
        <hr className={'mt-3 border-t border-slate-900'} />
        <div className={'flex mb-3 text-xs'}>
          <label className={'font-bold flex-grow'}>
            Total de Custo do Risco:
          </label>
          <span className={'text-justify'}>{brazilReal.format(riskCost)}</span>
        </div>
      </div>
    </div>
  )
}
