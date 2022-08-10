import { leftArrowIcon, saveIcon } from '@components/icons'
import { CustomerInterface } from '@interfaces/customerInterface'

interface headerInterface {
  mode: 'table' | 'form'
  switchMode: () => void
  customer: CustomerInterface
  saveCustomer: (customer: CustomerInterface) => Promise<void>
}

export default function header({
  mode,
  switchMode,
  customer,
  saveCustomer,
}: headerInterface) {
  return (
    <div
      className={`flex flex-row mt-7 mb-2 ${mode === 'form' ? '' : 'hidden'}`}
    >
      <div className={'flex flex-grow'}>
        <button
          onClick={() => switchMode()}
          className={`
                          bg-red-700 text-slate-50 px-3 py-2 
                          rounded-md hover:bg-red-800 mb-1 mr-1
                          `}
        >
          <div className={'flex'}>
            <span className={'mr-2'}>{leftArrowIcon}</span>
            <span>Voltar</span>
          </div>
        </button>
      </div>
      <button
        onClick={() => saveCustomer(customer)}
        className={`
                        bg-green-700 text-slate-50 px-3 py-2 
                        rounded-md hover:bg-green-800 mb-1 ml-1
                        `}
      >
        <div className={'flex'}>
          <span className={'mr-2'}>{saveIcon}</span>
          <span>{customer?._id ? 'Alterar' : 'Salvar'}</span>
        </div>
      </button>
    </div>
  )
}
