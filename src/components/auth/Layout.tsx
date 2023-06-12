import Head from 'next/head'
import { Dispatch, SetStateAction } from 'react'
import Footer from '@components/auth/Footer'
import logo from '@public/images/logo.png'
import Image from 'next/image'

interface LoginInterface {
  title: string
  mode: 'login' | 'singup' | 'forgot'
  children: any
  setMode: Dispatch<SetStateAction<'login' | 'singup' | 'forgot'>>
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
        <link
          rel={'shortcut icon'}
          type={'image/png'}
          href={'images/logo.png'}
        />
        <title>{mode === 'login' ? 'Login' : 'Cadastro'}</title>
      </Head>
      <div
        className={
          'py-3 px-7 bg-slate-200 z-10 rounded-xl md:border-4 md:border-indigo-800'
        }
      >
        <div className={'flex justify-center mb-3'}>
          <div className={`h-20 w-20 mb-4`}>
            <Image src={logo} alt={'Logo'} />
          </div>
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
