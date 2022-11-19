import { leftArrowIcon } from '@components/icons'
import Link from 'next/link'

interface HeaderInterface {
  projectID: string
  riskID: string
}

export default function Header({ projectID, riskID }: HeaderInterface) {
  return (
    <div className={`flex`}>
      <div className={'w-1/4'}>
        <Link href={`/projects/${projectID}/risks/${riskID}/actions`}>
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
    </div>
  )
}
