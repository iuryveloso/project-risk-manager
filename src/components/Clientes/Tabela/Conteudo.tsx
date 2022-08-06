import Cliente from '@model/Cliente'
import { IconeEditar, IconeRemover } from '@components/icons'

interface ConteudoTabelaProps {
    clientes: Cliente[]
    clienteSelecionado?: (cliente: Cliente) => void
    clienteExcluido?: (cliente: Cliente) => void
    modo:string
}

export default function ConteudoTabela(props: ConteudoTabelaProps) {
    const exibirAcoes = props.clienteSelecionado || props.clienteSelecionado

    function renderizarCabecalho() {
        return (
            <tr>
                <th className={`text-left pl-3 p-3 w-1/12`}>Código</th>
                <th className={`text-left p-2 `}>Nome</th>
                <th className={`text-left p-2 w-1/12`}>Idade</th>
                {exibirAcoes ? (
                    <th className={`text-left p-2 w-1/12`}>Ações</th>
                ) : false}
            </tr>
        )
    }

    function renderizarDados() {
        return props.clientes?.map((cliente, i) => {
            return (
                <tr key={cliente.id} className={
                    `${i % 2 === 0 ? `
                        bg-slate-100
                        dark:bg-slate-600
                    ` : `
                        bg-slate-200
                        dark:bg-slate-700
                    `}`
                }>
                    <td className={`text-left pl-3 p-2`}>{cliente.id}</td>
                    <td className={`text-left p-2`}>{cliente.nome}</td>
                    <td className={`text-left p-2`}>{cliente.idade} anos</td>
                    {exibirAcoes ? (
                        renderizarAcoes(cliente)
                    ) : false}
                </tr>
            )
        })
    }

    function renderizarAcoes(cliente: Cliente) {
        return (
            <td className={`text-left p-2 flex items-center `}>
                {props.clienteSelecionado ? (
                    <button onClick={() => props.clienteSelecionado?.(cliente)} className={`
                        text-green-600 hover:text-green-800 
                        dark:text-green-500 dark:hover:text-green-700 
                        rounded-full mr-2
                    `}>
                        {IconeEditar}
                    </button>
                ) : false}
                {props.clienteExcluido ? (
                    <button onClick={() => props.clienteExcluido?.(cliente)} className={`
                        text-red-600 hover:text-red-800 
                        dark:text-red-500 dark:hover:text-red-700
                        rounded-full ml-2
                    `}>
                        {IconeRemover}
                    </button>
                ) : false}
            </td>
        )
    }

    return (
        <div className={props.modo === 'tabela' ? '': 'hidden'}>
            <div className={`flex justify-center`}>
                <table className={`w-full rounded-xl overflow-hidden text-slate-900 dark:text-slate-300`}>
                    <thead className={`
                        bg-slate-300 dark:bg-slate-900 
                        `}>
                        {renderizarCabecalho()}
                    </thead>
                    <tbody>
                        {renderizarDados()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}