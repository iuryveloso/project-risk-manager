import AvatarUsuario from '@components/template/AvatarUsuario'
import Layout from '@components/template/Layout'

export default function perfil() {
    return (
        <Layout
            pagina={`Perfil`}
            titulo={`Perfil do Usuário`}
            subtitulo={`Personalize o seu perfil de usuário aqui`}
        >
            <span>Perfil do Usuário</span>
            <div>
                <AvatarUsuario width={'100'} height={'100'} />
            </div>
        </Layout>
    )
}
