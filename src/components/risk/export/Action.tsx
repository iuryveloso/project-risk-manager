import { ActionInterface } from '@interfaces/actionInterfaces'

interface ExportInteface {
  actions: ActionInterface[]
}

export default function Export({ actions }: ExportInteface) {
  const brazilReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  return (
    <div style={{ width: '34rem', fontFamily: 'arial' }}>
      <div className={'mt-5 text-black'}>
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
                <span className={'text-justify'}>
                  {brazilReal.format(action.cost)}
                </span>
              </li>
              <li className={'flex text-xs mb-5'}>
                <label className={'font-bold mr-2'}>Observação: </label>
                <span className={'text-justify'}>{action.observation}</span>
              </li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}
