import Theme from '@api/Theme'
import { createContext, useEffect, useState } from 'react'

interface AppContextProps {
  theme?: string
  switchTheme?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props: { children: any }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  function switchTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    async function setThemeOnSession(theme: string) {
      await Theme.set(theme)
    }
    setThemeOnSession(newTheme)
    setTheme(newTheme)
    // localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    async function getThemeOnSession() {
      await Theme.get().then((item) => {
        setTheme(item.theme)
      })
    }
    getThemeOnSession()
    // const savedTheme = localStorage.getItem('theme') ?? ''
    // setTheme(savedTheme)
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
