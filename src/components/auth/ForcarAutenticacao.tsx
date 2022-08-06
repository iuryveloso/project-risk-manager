import Image from 'next/image'
import Router from 'next/router'
import loading from '@public/images/loading.gif'
// import useAuthData from '@data/hook/useAuthData'
import Cookies from 'js-cookie'

export default function ForcarAutenticacao(props: { children: any }) {

    // const { usuario, carregando } = useAuthData()
    // function renderizarConteudo() {
    //     return !Cookies.get('admin-template-auth') ? Router.push('/autenticacao') : props.children
    // }
    // function renderizarCarregando() {
    //     return (
    //         <div className={`
    //             flex justify-center items-center h-screen
    //         `}>
    //             <Image src={loading} alt="Loading" />
    //         </div>
    //     )
    // }

    // if (!carregando && usuario?.email) {
    //     return renderizarConteudo()
    // } else if (carregando) {
    //     return renderizarCarregando()
    // } else {
    //     Router.push('/autenticacao')
    //     return null
    // }
    return (
        <div></div>
    )
}