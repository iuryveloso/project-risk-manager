import { IconeLua, IconeSol } from '@components/icons'

interface BotaoAlternarTemaProps {
  tema: string
  alternarTema?: () => void
}

export default function BotaoAlternarTema(props: BotaoAlternarTemaProps) {
  return props.tema === 'dark' ? (
    <div
      onClick={props.alternarTema}
      className={`
            hidden sm:flex items-center cursor-pointer
            bg-gradient-to-r from-yellow-300 to-yellow-600
            w-14 lg:w-24 h-10 p-1 rounded-full
        `}
    >
      <div
        className={`
                flex items-center justify-center
                bg-slate-100 text-yellow-600 
                w-7 h-7 rounded-full
            `}
      >
        {IconeSol}
      </div>
      <div
        className={'hidden lg:flex items-center ml-2 text-slate-100 text-sm'}
      >
        <span>Claro</span>
      </div>
    </div>
  ) : (
    <div
      onClick={props.alternarTema}
      className={`
            hidden sm:flex items-center justify-end cursor-pointer
            bg-gradient-to-r from-slate-500 to-slate-900
            w-14 lg:w-24 h-10 p-1 rounded-full
        `}
    >
      <div
        className={'hidden lg:flex items-center mr-1 text-slate-300 text-sm'}
      >
        <span>Escuro</span>
      </div>
      <div
        className={`
                flex items-center justify-center
                bg-slate-900 text-yellow-300 
                w-7 h-7 rounded-full
            `}
      >
        {IconeLua}
      </div>
    </div>
  )
}
