import { useState } from 'react'
import {
  settingsIcon,
  customerIcon,
  homeIcon,
  notificationsIcon,
  exitIcon,
  userIcon,
} from '@components/icons'
// import Logout from '@components/template/Modal/Logout'
import Logo from '@components/template/Logo'
import MenuItem from '@components/template/MenuItem'

export default function SideMenu() {
  const [modal, setModal] = useState('hidden')

  function showModal() {
    modal === '' ? setModal('hidden') : setModal('')
  }

  return (
    <aside className={'flex flex-col h-screen bg-slate-100 dark:bg-slate-900 '}>
      <div
        className={`
            flex items-center justify-center
                h-24 w-24 mt-4`}
      >
        <Logo />
      </div>
      <ul className={'flex-grow'}>
        <MenuItem url={'/'} text={'Início'} icon={homeIcon} />
        <MenuItem url={'/settings'} text={'Ajustes'} icon={settingsIcon} />
        <MenuItem
          url={'/notifications'}
          text={'Notificações'}
          icon={notificationsIcon}
        />
        <MenuItem url={'/profile'} text={'Perfil'} icon={userIcon} />
        <MenuItem url={'/customers'} text={'Clientes'} icon={customerIcon} />
      </ul>
      <ul>
        <MenuItem
          onClick={showModal}
          text={'Sair'}
          icon={exitIcon}
          className={`
                    text-red-600 hover:bg-red-400 hover:text-white
                        dark:text-red-400 dark:hover:text-white
                `}
        />
      </ul>

      {/* <Logout modal={modal} showModal={showModal} logout={logout} /> */}
    </aside>
  )
}
