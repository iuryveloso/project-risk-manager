import { alertIcon } from '@components/icons'

interface ErrorInterface {
  error: string | null
}

export default function Error({ error }: ErrorInterface) {
  return (
    <div
      className={`
                  ${error ? '' : 'hidden'} flex justify-center
                `}
    >
      <div
        className={`flex items-center bg-red-500 border
                    text-white py-1 px-2 text-sm rounded-lg`}
      >
        {alertIcon()}
        <span className={'ml-2'}>{error}</span>
      </div>
    </div>
  )
}
