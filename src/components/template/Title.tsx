interface TitleProps {
  title: string
  subtitle: string
}

export default function Title(props: TitleProps) {
  return (
    <div>
      <h1 className={'font-medium text-3xl text-slate-900 dark:text-slate-200'}>
        {props.title}
      </h1>
      <h2 className={'font-light text-xl  text-slate-600 dark:text-slate-400'}>
        {props.subtitle}
      </h2>
    </div>
  )
}
