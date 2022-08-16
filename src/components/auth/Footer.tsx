import Image from 'next/image'
import googleLogo from '@public/google-logo.svg'
import { Dispatch, SetStateAction } from 'react'

interface FooterInterface {
  mode: 'login' | 'singup'
  setMode: Dispatch<SetStateAction<'login' | 'singup'>>
}

export default function Footer({ mode, setMode }: FooterInterface) {
  return (
    <div>
      <div className={mode === 'singup' ? 'hidden' : ''}>
        <hr className={'my-3 border border-gray-300 w-full'} />

        <button
          className={` 
          flex justify-center items-center w-full bg-red-600 hover:bg-red-700 text-white rounded-lg
          px-3 py-2
      `}
        >
          <Image
            className={'w-8 mr-3'}
            src={googleLogo}
            width="25"
            height={'25'}
            alt="Google Logo"
          />
          <span className="ml-3">Entrar com Google</span>
        </button>
      </div>
      <div className="sm:flex mt-3">
        {mode === 'login' ? (
          <p className={'flex flex-grow text-slate-700'}>
            Novo por aqui?
            <a
              onClick={() => setMode('singup')}
              className={`
                      text-blue-500 hover:text-blue-700 
                      font-semibold cursor-pointer ml-1
                  `}
            >
              Cadastre-se
            </a>
          </p>
        ) : (
          <p className={'flex flex-grow text-slate-700'}>
            Já é cadastrado?
            <a
              onClick={() => setMode('login')}
              className={`
                      text-blue-500 hover:text-blue-700 
                      font-semibold cursor-pointer ml-1
                  `}
            >
              Acesse sua Conta
            </a>
          </p>
        )}

        <p>
          <a
            onClick={() => setMode('login')}
            className={`
                  text-blue-500 hover:text-blue-700 
                  font-semibold cursor-pointer ml-1
              `}
          >
            Esqueci minha senha
          </a>
        </p>
      </div>
    </div>
  )
}
