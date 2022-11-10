import { checkCircleIcon } from '@components/icons'

interface MessageInterface {
  message: string | null
}

export default function Message({ message }: MessageInterface) {
  return (
    <div
      className={`
                  ${message ? '' : 'hidden'} flex justify-center
                `}
    >
      <div
        className={`flex items-center bg-green-500 border border-black dark:border-white
                    text-white py-2 px-3 text-sm rounded-lg`}
      >
        {checkCircleIcon}
        <span className={'ml-2'}>{message}</span>
      </div>
    </div>
  )
}
