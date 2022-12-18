import useAppData from '@data/hook/useAppData'
import { MoonIcon, sunIcon } from '@components/icons'

export default function SwitchTheme() {
  const { theme, switchTheme } = useAppData()
  return theme === 'dark' ? (
    <div
      onClick={switchTheme}
      className={`
            hidden sm:flex items-center cursor-pointer
            bg-gradient-to-r from-yellow-300 to-yellow-600
            hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-700
            w-14 lg:w-24 h-9 p-1 rounded-full
        `}
    >
      <div
        className={`
                flex items-center justify-center
                bg-slate-100 text-yellow-600 
                w-7 h-7 rounded-full
            `}
      >
        {sunIcon}
      </div>
      <div
        className={'hidden lg:flex items-center ml-2 text-slate-800 text-sm'}
      >
        <span>Claro</span>
      </div>
    </div>
  ) : (
    <div
      onClick={switchTheme}
      className={`
            hidden sm:flex items-center justify-end cursor-pointer
            bg-gradient-to-r from-slate-500 to-slate-900
            hover:bg-gradient-to-r hover:from-slate-400 hover:to-slate-800
            w-14 lg:w-24 h-9 p-1 rounded-full
        `}
    >
      <div
        className={'hidden lg:flex items-center mr-1 text-slate-200 text-sm'}
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
        {MoonIcon}
      </div>
    </div>
  )
}
