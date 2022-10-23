import UserAvatar from '@components/template/UserAvatar'
import SwitchTheme from '@components/template/SwitchTheme'
import Title from '@components/template/Title'

interface HeaderProps {
  title: string
  subtitle: string
}

export default function Header(props: HeaderProps) {
  return (
    <div className={'flex'}>
      <div className={'w-1/6'} />
      <div className={'flex justify-center items-center w-4/6'}>
        <Title title={props.title} subtitle={props.subtitle} />
      </div>
      <div className={'flex justify-end items-center w-1/6'}>
        <SwitchTheme />
        <UserAvatar
          href={'/profile'}
          width={'40'}
          height={'40'}
          className={'ml-3 mt-2'}
        />
      </div>
    </div>
  )
}
