import { leftArrowIcon, saveIcon } from '@components/icons'
import { RiskInterface } from '@interfaces/riskInterfaces'
import Error from '@components/risk/alerts/Error'
import Message from '@components/risk/alerts/Message'

interface HeaderInterface {
  mode: 'main' | 'create' | 'edit'
  switchMode: (mode: 'main' | 'create' | 'edit') => void
  risk: RiskInterface
  saveRisk: (risk: RiskInterface) => void
  error: string | null
  message: string | null
}

export default function Header({
  mode,
  switchMode,
  risk,
  saveRisk,
  error,
  message,
}: HeaderInterface) {
  return (
    <>
      {mode === 'create' ? (
        <div className={`flex`}>
          <div className={'w-1/3'}>
            <button
              onClick={() => switchMode('main')}
              className={`
                            focus:border-indigo-700 dark:focus:border-indigo-600
                            bg-red-700 text-slate-50 px-3 py-2  mt-2
                            rounded-lg hover:bg-red-800
                            `}
            >
              <div className={'flex'}>
                <span className={'mr-2'}>{leftArrowIcon}</span>
                <span>Voltar</span>
              </div>
            </button>
          </div>
          <div className={'flex justify-center w-1/3'}>
            <Error error={error} />
            <Message message={message} />
          </div>
          <div className={'flex justify-end w-1/3'}>
            <button
              onClick={() => saveRisk(risk)}
              className={`
                            focus:border-indigo-700 dark:focus:border-indigo-600
                            bg-green-700 text-slate-50 px-3 py-2 
                            rounded-lg hover:bg-green-800 mt-2 ml-1
                            `}
            >
              <div className={'flex'}>
                <span className={'mr-2'}>{saveIcon}</span>
                <span>Salvar</span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        false
      )}
    </>
  )
}
