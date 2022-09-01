import Head from 'next/head'
import Logo from '@components/template/Logo'
import { Dispatch, SetStateAction } from 'react'
import Footer from '@components/auth/Footer'

interface LoginInterface {
  title: string
  mode: 'login' | 'singup'
  children: any
  setMode: Dispatch<SetStateAction<'login' | 'singup'>>
  getGoogleOAuthURl: () => string
}

export default function Login({
  title,
  mode,
  children,
  setMode,
  getGoogleOAuthURl,
}: LoginInterface) {
  return (
    <div className="flex h-screen items-center  justify-center md:bg-gradient-to-r md:from-blue-600 md:to-cyan-600">
      <Head>
        <link rel="shortcut icon" type="image/png" href="icon.png" />
        <title>{mode === 'login' ? 'Login' : 'Cadastro'}</title>
      </Head>
      <div
        className={
          'py-3 px-7 bg-slate-200 z-10 rounded-xl md:border-4 md:border-indigo-800'
        }
      >
        <div className={'flex justify-center mb-3'}>
          <Logo width="w-20" height="h-20" ballWidth="w-6" ballHeight="h-6" />
        </div>
        <h1 className={'text-4xl font-bold mb-5 text-slate-800 text-center'}>
          {title}
        </h1>
        <div>{children}</div>
        <Footer
          mode={mode}
          setMode={setMode}
          getGoogleOAuthURl={getGoogleOAuthURl}
        />
      </div>
    </div>
  )
}
