import Head from 'next/head'
import Content from '@components/template/Content'
import Header from '@components/template/Header'
import SideMenu from '@components/template/SideMenu'
import useAppData from '@data/hook/useAppData'
import { ReactElement } from 'react'
import ForceAuth from '@components/auth/ForceAuth'

interface LayoutProps {
  page: string
  title: string
  subtitle?: string
  children?: any
  contentHeader?: ReactElement
}

export default function Layout({
  page,
  title,
  subtitle,
  children,
  contentHeader,
}: LayoutProps) {
  const { theme } = useAppData()

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <ForceAuth>
        <div className={` flex h-screen w-screen `}>
          <Head>
            <link
              rel={'shortcut icon'}
              type={'image/png'}
              href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/images/logo.png`}
            />
            <title>{page}</title>
          </Head>
          <SideMenu />
          <div
            className={'flex flex-col w-full p-5 bg-slate-50 dark:bg-slate-800'}
          >
            <Header title={title} subtitle={subtitle || ''} />
            <div className={`mt-3 mb-2`}>{contentHeader}</div>
            <Content>{children}</Content>
          </div>
        </div>
      </ForceAuth>
    </div>
  )
}
