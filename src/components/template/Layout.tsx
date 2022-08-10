import Head from 'next/head'
import Content from '@components/template/Content'
import Header from '@components/template/Header'
import SideMenu from '@components/template/SideMenu'
import useAppData from '@data/hook/useAppData'
import { ReactElement } from 'react'

interface LayoutProps {
  page: string
  title: string
  subtitle: string
  children?: any
  globalHeader?: ReactElement
}

export default function Layout(props: LayoutProps) {
  const context = useAppData()

  return (
    // <ForcarAutenticacao>
    <div
      className={`${
        context.theme === 'dark' ? 'dark' : ''
      } flex h-screen w-screen`}
    >
      <Head>
        <link rel="shortcut icon" type="image/png" href="icon.png" />
        <title>{props.page}</title>
      </Head>
      <SideMenu />
      <div className={'flex flex-col w-full p-7 bg-white dark:bg-slate-800'}>
        <Header title={props.title} subtitle={props.subtitle} />
        {props.globalHeader}
        <Content>{props.children}</Content>
      </div>
    </div>
    // </ForcarAutenticacao>
  )
}
