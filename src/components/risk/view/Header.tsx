import { leftArrowIcon } from '@components/icons'
import { useRouter } from 'next/router'

interface HeaderInterface {
  projectID: string
}

export default function Header({ projectID }: HeaderInterface) {
  const router = useRouter()
  return (
    <div className={`flex`}>
      <div className={'w-1/3'}>
        <button
          onClick={() => router.push(`/projects/${projectID}/risks`)}
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
    </div>
  )
}
