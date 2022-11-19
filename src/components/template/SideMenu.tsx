import { useState } from 'react'
import {
  homeIcon,
  exitIcon,
  userIcon,
  clipboardDocumentList,
  bookIcon,
} from '@components/icons'
import LogoutModal from '@components/template/LogoutModal'
import MenuItem from '@components/template/MenuItem'
import useAuth from '@data/hook/useAuth'
import logo from '@public/images/logo.png'
import Image from 'next/image'

export default function SideMenu() {
  const [modal, setModal] = useState('hidden')

  const { logout } = useAuth({})

  function showModal() {
    modal === '' ? setModal('hidden') : setModal('')
  }

  return (
    <aside className={'flex flex-col h-screen bg-slate-100 dark:bg-slate-900 '}>
      <div className={`h-16 w-16 mt-4 mx-3`}>
        <Image src={logo} alt={'Logo'} />
      </div>
      <div
        className={
          'flex flex-col justify-center items-center overflow-y-auto scrollbar dark:scrollbar-dark flex-grow'
        }
      >
        <ul>
          <MenuItem url={'/'} text={'Início'} icon={homeIcon} />
          <MenuItem url={'/profile'} text={'Perfil'} icon={userIcon} />
          <MenuItem url={'/instructions'} text={'Instruções'} icon={bookIcon} />
          <MenuItem
            url={'/projects'}
            text={'Projetos'}
            icon={clipboardDocumentList}
          />
        </ul>
      </div>
      <div>
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
        <LogoutModal modal={modal} showModal={showModal} logout={logout} />
      </div>
    </aside>
  )
}
