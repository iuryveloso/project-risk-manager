import Link from 'next/link'

interface MenuItemProps {
  texto: string
  icone: any
  url?: string
  onClick?: (e: any) => void
  className?: string
}

export default function MenuItem(props: MenuItemProps) {
  function renderizarLink() {
    return (
      <a
        className={`
            flex flex-col justify-center items-center 
            w-24 h-24
            ${
              props.className
                ? props.className
                : `
                text-slate-700
                dark:text-slate-300 
            `
            }`}
      >
        {props.icone}
        <span className={'text-xs font-light '}>{props.texto}</span>
      </a>
    )
  }
  return (
    <li
      onClick={props.onClick}
      className={' hover:bg-slate-300 cursor-pointer dark:hover:bg-slate-800'}
    >
      {props.url ? (
        <Link href={props.url}>{renderizarLink()}</Link>
      ) : (
        renderizarLink()
      )}
    </li>
  )
}
