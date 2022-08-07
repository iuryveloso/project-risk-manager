import { IconeMais, IconePesquisar } from '@components/icons'
import { useState } from 'react'

interface CabecalhoTabelaProps {
  pesquisar: (pesquisa: string) => void
  NovoCliente: () => void
}

export default function CabecalhoTabela(props: CabecalhoTabelaProps) {
  const [pesquisa, setPesquisa] = useState('')
  return (
    <div className={'flex w-full'}>
      <button
        className={`
            text-slate-50 px-3 py-2 mb-3 rounded-full
            bg-green-600 hover:bg-green-700
            dark:bg-green-500 dark:hover:bg-green-600
        `}
        onClick={() => props.NovoCliente()}
      >
        {IconeMais}
      </button>
      <div className={'flex flex-grow justify-end'}>
        <input
          className={`
                px-4 py-3 rounded-l-md rounded-y-md border focus:outline-none mb-3 ml-5
                bg-slate-100 dark:bg-slate-600
                border-slate-500 dark:border-slate-200
                text-slate-900 dark:text-slate-100
                focus:bg-white dark:focus:bg-slate-500 
                focus:border-indigo-700 dark:focus:border-indigo-600 

            `}
          type="text"
          placeholder="Pesquisar..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          onKeyPress={(e) =>
            e.key === 'Enter' ? props.pesquisar(pesquisa) : false
          }
        />

        <button
          className={`
                text-slate-50 px-3 py-2 mb-3 rounded-r-md rounded-y-md
                bg-blue-600 hover:bg-blue-700
                dark:bg-blue-500 dark:hover:bg-blue-600
            `}
          onClick={() => props.pesquisar(pesquisa)}
        >
          {IconePesquisar}
        </button>
      </div>
    </div>
  )
}
