import { plusIcon } from '@components/icons'
import Error from '@components/customer/alerts/Error'
import Message from '@components/customer/alerts/Message'

interface HeaderInterface {
  mode: 'form' | 'table'
  newCustomer: () => void
  search: (searchTag: string) => void
  error: string | null
  message: string | null
}

export default function Header({
  newCustomer,
  search,
  mode,
  error,
  message,
}: HeaderInterface) {
  return (
    <div className={mode === 'table' ? '' : 'hidden'}>
      <div className={`flex mt-7 mb-3`}>
        <div className={'w-1/3'}>
          <button
            className={`
                    focus:border-indigo-700 dark:focus:border-indigo-600
                    text-slate-50 px-3 py-2 mt-2 rounded-lg
                    bg-green-600 hover:bg-green-700
                    dark:bg-green-500 dark:hover:bg-green-600
                `}
            onClick={() => newCustomer()}
          >
            <div className={'flex'}>
              <span className={'mr-2'}>{plusIcon}</span>
              <span>Novo</span>
            </div>
          </button>
        </div>
        <div className={'flex justify-center w-1/3'}>
          <Error error={error} />
          <Message message={message} />
        </div>
        <div className={'flex justify-end w-1/3'}>
          <input
            className={`
                      px-4 py-2 rounded-md border focus:outline-none mt-2 ml-5
                      bg-slate-100 dark:bg-slate-600
                      border-slate-500 dark:border-slate-200
                      text-slate-900 dark:text-slate-100
                      focus:bg-white dark:focus:bg-slate-500 
                      focus:border-indigo-700 dark:focus:border-indigo-600 

                  `}
            type="text"
            placeholder="Pesquisar..."
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
