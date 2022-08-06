import Layout from "@components/template/Layout"
// import useClientes from "@data/hook/useClientes"
import CabecalhoTabela from "@components/Clientes/Tabela/Cabecalho"
import ConteudoTabela from "@components/Clientes/Tabela/Conteudo"
import Formulario from "@components/Clientes/Formulario/Formulario"

export default function Clientes() {
    // const { 
    //     cliente,
    //     clientes,
    //     novoCliente,
    //     salvarCliente,
    //     selecionarCliente,
    //     excluirCliente,
    //     pesquisar,
    //     modo,
    //     alternarModo
    // } = useClientes()

    return (
        <Layout
            pagina={`Clientes`}
            titulo={`Clientes Cadastrados`}
            subtitulo={`Visualize, edite e adicione novas informações aos clientes`}
        >
            <h1>Cliente</h1>
            {/* <CabecalhoTabela 
                pesquisar={pesquisar}
                NovoCliente={novoCliente}
            />
            <ConteudoTabela
                clientes={clientes}
                clienteSelecionado={selecionarCliente}
                clienteExcluido={excluirCliente}
                modo={modo}
            />
            <Formulario
                cliente={cliente} 
                salvarDados={salvarCliente}
                modo={modo}
                alternarModo={alternarModo}
            /> */}
        </Layout>
    )
}
