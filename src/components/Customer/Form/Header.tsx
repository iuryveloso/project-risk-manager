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
      className={`flex flex-row mt-7 mb-3  ${mode === 'form' ? '' : 'hidden'}`}
    >
      <div className={'flex flex-grow'}>
        <button
          onClick={() => switchMode()}
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
      <button
        onClick={() => saveCustomer(customer)}
        className={`
                        focus:border-indigo-700 dark:focus:border-indigo-600
                        bg-green-700 text-slate-50 px-3 py-2 
                        rounded-lg hover:bg-green-800 mt-2 ml-1
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
