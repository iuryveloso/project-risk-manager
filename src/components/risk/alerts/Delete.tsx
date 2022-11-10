import { alertShieldIcon } from '@components/icons'

interface DeleteInterface {
  deleteMessage: string | null
}

export default function Delete({ deleteMessage }: DeleteInterface) {
  return (
    <div
      className={`
                  ${deleteMessage ? '' : 'hidden'} flex justify-center
                `}
    >
      <div
        className={`flex items-center bg-yellow-600 border border-black dark:border-white
                    text-white py-2 px-3 text-sm rounded-lg`}
      >
        {alertShieldIcon}
        <span className={'ml-2'}>{deleteMessage}</span>
      </div>
    </div>
  )
}
