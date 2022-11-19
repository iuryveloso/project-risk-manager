import { leftArrowIcon } from '@components/icons'
import Message from '@components/risk/alerts/Message'
import Link from 'next/link'

interface HeaderInterface {
  projectID: string
  message: string | null
}

export default function Header({ message, projectID }: HeaderInterface) {
  return (
    <div className={`flex`}>
      <div className={'w-1/3'}>
        <Link href={`/projects/${projectID}/risks`}>
          <button
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
        </Link>
      </div>
      <div className={'flex justify-center w-1/3'}>
        <Message message={message} />
      </div>
    </div>
  )
}
