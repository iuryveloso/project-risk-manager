interface ContentProps {
  children: any
}

export default function Content(props: ContentProps) {
  return (
    <div
      className={
        'flex flex-col text-slate-900 dark:text-slate-300 rounded-xl overflow-auto scrollbar dark:scrollbar-dark'
      }
    >
      {props.children}
    </div>
  )
}
