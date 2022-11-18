import { leftArrowIcon } from '@components/icons'
import Message from '@components/risk/alerts/Message'
import { useRouter } from 'next/router'

interface HeaderInterface {
  projectID: string
  subTaskID?: string
  message: string | null
}

export default function Header({
  message,
  projectID,
  subTaskID,
}: HeaderInterface) {
  const router = useRouter()
  return (
    <div className={`flex`}>
      <div className={'w-1/3'}>
        <button
          onClick={() =>
            router.push(`/projects/${projectID}/tasks/${subTaskID || ''}`)
          }
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
        <Message message={message} />
      </div>
    </div>
  )
}
