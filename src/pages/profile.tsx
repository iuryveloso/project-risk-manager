import UserAvatar from '@components/template/UserAvatar'
import Layout from '@components/template/Layout'

export default function Profile() {
  return (
    <Layout
      page={'Perfil'}
      title={'Perfil do Usuário'}
      subtitle={'Personalize o seu perfil de usuário aqui'}
    >
      <span>Perfil do Usuário</span>
      <div>
        <UserAvatar width={'100'} height={'100'} />
      </div>
    </Layout>
  )
}
