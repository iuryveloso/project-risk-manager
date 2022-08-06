import Head from "next/head";
import Conteudo from "@components/template/Conteudo";
import Cabecalho from "@components/template/Cabecalho";
import MenuLateral from "@components/template/MenuLateral";
import useAppData from "@data/hook/useAppData";

interface LayoutProps {
    pagina: string
    titulo: string
    subtitulo: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    const context = useAppData()

    return (
        // <ForcarAutenticacao>
            <div className={`${context.tema} flex h-screen w-screen`}>
                <Head>
                    <link rel="shortcut icon" type="image/png" href="icon.png" />
                    <title>{props.pagina}</title>
                </Head>
                <MenuLateral />
                <div className={`flex flex-col w-full p-7 bg-white dark:bg-slate-800`}>
                    <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />
                    <Conteudo>
                        {props.children}
                    </Conteudo>
                </div>
            </div>
        // </ForcarAutenticacao>
    )
}