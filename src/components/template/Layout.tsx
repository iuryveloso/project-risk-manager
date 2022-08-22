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
  subtitle: string
  children?: any
  globalHeader?: ReactElement
}

export default function Layout({
  page,
  title,
  subtitle,
  children,
  globalHeader,
}: LayoutProps) {
  const context = useAppData()

  return (
    <ForceAuth>
      <div
        className={`${
          context.theme === 'dark' ? 'dark' : ''
        } flex h-screen w-screen`}
      >
        <Head>
          <link rel="shortcut icon" type="image/png" href="icon.png" />
          <title>{page}</title>
        </Head>
        <SideMenu />
        <div className={'flex flex-col w-full p-7 bg-white dark:bg-slate-800'}>
          <Header title={title} subtitle={subtitle} />
          {globalHeader}
          <Content>{children}</Content>
        </div>
      </div>
    </ForceAuth>
  )
}
