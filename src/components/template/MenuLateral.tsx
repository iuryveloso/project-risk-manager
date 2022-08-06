import { useState } from "react"
import { IconeAjustes, IconeClientes, IconeInicio, IconeNotificacoes, IconeSair, IconeUsuario } from "@components/icons"
import ModalSair from "@components/template/Modal/Sair"
import Logo from "@components/template/Logo"
import MenuItem from "@components/template/MenuItem"

export default function MenuLateral() {
    const [modal, setModal] = useState('hidden')

    function mostrarModal() {
        modal === '' ? setModal('hidden') : setModal('')
    }

    return (
        <aside className={`flex flex-col bg-slate-100 dark:bg-slate-900 `}>
            <div className={`
                flex flex-col items-center justify-center
                 h-24 w-24`}>
                <Logo />
            </div>
            <ul className={`flex-grow`}>
                <MenuItem url={`/`} texto={`Início`} icone={IconeInicio} />
                <MenuItem url={`/ajustes`} texto={`Ajustes`} icone={IconeAjustes} />
                <MenuItem url={`/notificacoes`} texto={`Notificações`} icone={IconeNotificacoes} />
                <MenuItem url={`/perfil`} texto={`Perfil`} icone={IconeUsuario} />
                <MenuItem url={`/clientes`} texto={`Clientes`} icone={IconeClientes} />
            </ul>
            <ul>
                <MenuItem
                    onClick={mostrarModal}
                    texto={`Sair`} icone={IconeSair}
                    className={`
                        text-red-600 hover:bg-red-400 hover:text-white
                         dark:text-red-400 dark:hover:text-white
                    `}
                />
            </ul>

            {/* <ModalSair modal={modal} mostrarModal={mostrarModal} logout={logout} /> */}
        </aside>
    )
}