import Link from 'next/link'

interface MenuItemProps {
  text: string
  icon: any
  url?: string
  onClick?: (e: any) => void
  className?: string
}

export default function MenuItem(props: MenuItemProps) {
  function renderLink() {
    return (
      <a
        className={`
            flex flex-col justify-center items-center 
            w-20 h-20 mx-1
            ${
              props.className
                ? props.className
                : `
                text-slate-700
                dark:text-slate-300 
            `
            }`}
      >
        {props.icon}
        <span className={'text-xs font-light '}>{props.text}</span>
      </a>
    )
  }
  return (
    <li
      onClick={props.onClick}
      className={' hover:bg-slate-300 cursor-pointer dark:hover:bg-slate-800'}
    >
      {props.url ? <Link href={props.url}>{renderLink()}</Link> : renderLink()}
    </li>
  )
}
