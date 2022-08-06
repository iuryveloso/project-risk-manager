interface TituloProps {
    titulo: string
    subtitulo: string
}

export default function Titulo(props: TituloProps) {
    return (
        <div>
            <h1 className={`font-medium text-3xl text-slate-900 dark:text-slate-200`}>
                {props.titulo}
            </h1>
            <h2 className={`font-light text-xl  text-slate-600 dark:text-slate-400`}>
                {props.subtitulo}
            </h2>
        </div>
    )
}