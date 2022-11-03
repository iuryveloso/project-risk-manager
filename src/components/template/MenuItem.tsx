import Link from 'next/link'
import { useRouter } from 'next/router'

interface MenuItemProps {
  text: string
  icon: any
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
  function renderLink() {
    return (
      <a
        className={`
            flex flex-col justify-center items-center 
            w-20 h-20 mx-1
            ${
              className ||
              `
                text-slate-700
                dark:text-slate-300 
            `
            }`}
      >
        {icon}
        <span className={'text-xs font-light '}>{text}</span>
      </a>
    )
  }
  return (
    <li
      onClick={onClick}
      className={
        currentPage === url?.split('/')[1]
          ? 'bg-slate-300 dark:bg-slate-800'
          : 'hover:bg-slate-300 dark:hover:bg-slate-800'
      }
    >
      {url ? <Link href={url}>{renderLink()}</Link> : renderLink()}
    </li>
  )
}
