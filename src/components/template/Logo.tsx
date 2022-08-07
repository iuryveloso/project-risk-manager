interface LogoProps {
  width?: string
  height?: string
  ballWidth?: string
  ballHeight?: string
}

export default function Logo(props: LogoProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        ${props.height ?? 'h-16'} ${props.width ?? 'w-16'} rounded-full
        bg-white border border-slate-700 dark:border-0 pb-1
    `}
    >
      <div
        className={`${props.ballHeight ?? 'h-5'} ${
          props.ballWidth ?? 'w-5'
        } rounded-full bg-green-600 mb-0.5`}
      />
      <div className={'flex'}>
        <div
          className={`${props.ballHeight ?? 'h-5'} ${
            props.ballWidth ?? 'w-5'
          } rounded-full bg-yellow-500 mr-0.5 mb-0.5`}
        />
        <div
          className={`${props.ballHeight ?? 'h-5'} ${
            props.ballWidth ?? 'w-5'
          } rounded-full bg-red-600 ml-0.5 mb-0.5`}
        />
      </div>
    </div>
  )
}
