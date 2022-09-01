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
      <Title title={props.title} subtitle={props.subtitle} />
      <div className={'flex flex-grow justify-end items-center'}>
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
