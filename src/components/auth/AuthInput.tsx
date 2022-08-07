import { useState } from 'react'
import { IconeNaoVer, IconeVer } from '@components/icons'

interface AuthInputProps {
  label: string
  valor: any
  obrigatorio?: boolean
  placeholder?: string
  tipo?: 'text' | 'email' | 'password'
  valorMudou: (novovalor: any) => void
}

export default function AuthInput(props: AuthInputProps) {
  const [tipo, setTipo] = useState<string>(props.tipo ?? 'text')

  return (
    <div className={'flex flex-col mt-4'}>
      <label>{props.label}</label>
      {props.tipo === 'password' ? (
        <div className={'flex mt-2'}>
          <input
            type={tipo}
            value={props.valor}
            onChange={(e) => props.valorMudou?.(e.target.value)}
            placeholder={props.placeholder}
            required={props.obrigatorio}
            className={`
                        flex-grow px-4 py-3 rounded-l-lg bg-slate-100
                        border-y border-l border-slate-300 
                        focus:border-r focus:outline-none focus:border-indigo-500 focus:bg-white                     
                    `}
          />
          <button
            onClick={() => setTipo(tipo === 'password' ? 'text' : 'password')}
            className={`
                    rounded-r-lg bg-slate-100 
                    border-y border-r border-slate-300 px-3 py-3
                    hover:bg-slate-200
                `}
          >
            {tipo === 'password' ? IconeVer : IconeNaoVer}
          </button>
        </div>
      ) : (
        <input
          type={tipo}
          value={props.valor}
          onChange={(e) => props.valorMudou?.(e.target.value)}
          placeholder={props.placeholder}
          required={props.obrigatorio}
          className={`
                    px-4 py-3 rounded-lg bg-slate-100 mt-2
                    border border-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-white
                `}
        />
      )}
    </div>
  )
}
