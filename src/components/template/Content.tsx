interface ContentProps {
  children: any
}

export default function Content(props: ContentProps) {
  return (
    <div
      className={
        'flex flex-col overflow-auto text-slate-900 dark:text-slate-300'
      }
    >
      {props.children}
    </div>
  )
}
