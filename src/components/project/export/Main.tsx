import logo from '@public/images/logo.png'
import Image from 'next/image'
import { ProjectInterface } from '@interfaces/projectInterfaces'
import UserInterface from '@interfaces/userInterfaces'

interface ExportMainInteface {
  project: ProjectInterface
  user: UserInterface
}

export default function ExportMain({ project, user }: ExportMainInteface) {
  return (
    <div style={{ width: '34rem' }}>
      <div className={'flex flex-col text-black'}>
        <div className={'flex justify-center'}>
          <div className={'mr-3 flex justify-center'}>
            <Image src={logo} width={60} height={60} />
          </div>
          <div className={'flex pt-3'}>
            <h1 className={'text-2xl font-bold '}>
              Gerenciador de Riscos de Projetos
            </h1>
          </div>
        </div>
        <div className={'flex justify-center'}>
          <h3 className={'text-xl font-bold'}>Relatório de Projeto</h3>
        </div>
      </div>

      <div className={'mt-7 text-black'}>
        <ul className={'flex flex-col'}>
          <div className={'mb-5'}>
            <li className={'flex text-xs justify-center'}>
              <span>{`Emitido por ${user.firstName} ${user.lastName} - ${user.occupation}`}</span>
            </li>
            <li className={'flex text-xs justify-center'}>
              <span>{user.email}</span>
            </li>
            <li className={'flex text-xs justify-center'}>
              <span>{`${user.company}`}</span>
            </li>
          </div>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Projeto: </label>
            <span>{project.title}</span>
          </li>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Descrição: </label>
            <div className={'flex flex-col'}>
              {project.description.split('\n').map((descriptionLine, index) => (
                <div key={index}>{descriptionLine}</div>
              ))}
            </div>
          </li>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Área de Atuação: </label>
            <span className={'text-justify'}>{project.occupationArea}</span>
          </li>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Início: </label>
            <span className={'text-justify mr-2'}>
              {`${project.begin.split('-')[2]} / ${
                project.begin.split('-')[1]
              } / ${project.begin.split('-')[0]}`}
            </span>
            <label className={'font-bold mx-2'}>Término: </label>
            <span className={'text-justify'}>{`${project.end.split('-')[2]} / ${
              project.end.split('-')[1]
            } / ${project.end.split('-')[0]}`}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
