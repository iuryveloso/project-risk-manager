import { createContext, useEffect, useState } from 'react'

interface AppContextProps {
  theme?: string
  switchTheme?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props: { children: any }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  function switchTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('USER_THEME', newTheme)
    setTheme(newTheme)
  }

  useEffect(() => {
    const getTheme =
      localStorage.getItem('USER_THEME') === 'light' ? 'light' : 'dark'
    setTheme(getTheme)
  }, [])

  return (
    <AppContext.Provider
      value={{
        theme,
        switchTheme,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext
