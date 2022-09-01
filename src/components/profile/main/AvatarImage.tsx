import { imageIcon } from '@components/icons'
import UserAvatar from '@components/template/UserAvatar'
import UserInterface from '@interfaces/userInterface'
import { useRouter } from 'next/router'

interface AvatarImageInterface {
  updateAvatar: (avatar: File) => void
  user: UserInterface
}

export default function AvatarImage({ updateAvatar }: AvatarImageInterface) {
  const router = useRouter()
  return (
    <div className={'flex flex-col mr-5 items-center'}>
      <h1 className={'font-medium text-2xl mb-1'}>Imagem de Perfil </h1>
      <div className={'m-2'}>
        <UserAvatar width={'150'} height={'150'} />
      </div>
      <label htmlFor="avatarInput">
        <div
          className={`
                  bg-sky-700 text-slate-50 px-3 py-2 
                  rounded-lg hover:bg-sky-800 cursor-pointer
                  focus:border-indigo-700 dark:focus:border-indigo-600
                `}
        >
          <div className={'flex'}>
            <span className={'mr-2'}>{imageIcon}</span>
            <span>Alterar Imagem</span>
          </div>
        </div>
      </label>
      <input
        type={'file'}
        id={'avatarInput'}
        className={'hidden'}
        onChange={(e) => {
          if (e.target.files) {
            updateAvatar(e.target.files[0])
            router.reload()
          }
        }}
      />
    </div>
  )
}
