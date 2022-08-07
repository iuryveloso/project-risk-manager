import useAppData from '@data/hook/useAppData'
import AvatarUsuario from '@components/template/AvatarUsuario'
import AlternarTema from '@components/template/AlternarTema'
import Titulo from '@components/template/Titulo'

interface CabecalhoProps {
  titulo: string
  subtitulo: string
}

export default function Cabecalho(props: CabecalhoProps) {
  const context = useAppData()
  return (
    <div className={'flex'}>
      <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
      <div className={'flex flex-grow justify-end items-center'}>
        <AlternarTema
          tema={context.tema ?? ''}
          alternarTema={context.alternarTema}
        />
        <AvatarUsuario
          href={'/perfil'}
          width={'40'}
          height={'40'}
          className={'ml-3 mt-2'}
        />
      </div>
    </div>
  )
}
