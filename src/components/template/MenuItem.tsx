import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

interface MenuItemProps {
  text: string
  icon: ReactElement
  url?: string
  onClick?: (e: any) => void
  className?: string
}

export default function MenuItem({
  icon,
  text,
  className,
  onClick,
  url,
}: MenuItemProps) {
  const router = useRouter()
  const currentPage = router.pathname.split('/')[1]
  const defaultClassName = `
  text-slate-800 dark:text-slate-300
  ${
    currentPage === url?.split('/')[1]
      ? 'bg-slate-50 dark:bg-slate-800'
      : 'hover:bg-slate-50 dark:hover:bg-slate-800'
  }`
  function renderLink() {
    return (
      <button
        onClick={onClick}
        className={`
              flex flex-col justify-center items-center text-slate
              w-20 h-20 mx-1
            `}
      >
        {icon}
        <span className={'text-xs font-medium '}>{text}</span>
      </button>
    )
  }
  return (
    <li className={className || defaultClassName}>
      {url ? <Link href={url}>{renderLink()}</Link> : renderLink()}
    </li>
  )
}
