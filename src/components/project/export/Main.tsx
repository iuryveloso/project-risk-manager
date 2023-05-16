import logo from '@public/images/logo.png'
import Image from 'next/image'
import { ProjectInterface } from '@interfaces/projectInterfaces'
import UserInterface from '@interfaces/userInterfaces'
import { ProjectUserInterface } from '@interfaces/projectUserInterfaces'

interface ExportMainInteface {
  project: ProjectInterface
  users: UserInterface[]
  projectUsers: ProjectUserInterface[]
}

export default function ExportMain({
  project,
  users,
  projectUsers,
}: ExportMainInteface) {
  const brazilReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  return (
    <div style={{ width: '34rem', fontFamily: 'arial' }}>
      <div className={'flex flex-col text-black'}>
        <div className={'flex justify-center'}>
          <div className={'mr-3 flex justify-center'}>
            <Image src={logo} width={60} height={60} />
          </div>
          <div className={'flex pt-2'}>
            <h1 className={'text-2xl font-bold '}>
              Gerenciador de Riscos de Projetos
            </h1>
          </div>
        </div>
        <div className={'flex justify-center'}>
          <h3 className={'text-xl font-bold'}>
            Relatório de Riscos do Projeto
          </h3>
        </div>
      </div>

      <div className={'mt-3 text-black'}>
        <ul className={'flex flex-col'}>
          <div className={'mb-3'}>
            {users
              .filter((user) => {
                return (
                  projectUsers.filter((projectUser) => {
                    return (
                      projectUser.userID.includes(user._id as string) &&
                      projectUser.projectID.includes(project._id as string)
                    )
                  }).length > 0
                )
              })
              .map((user, index) => {
                const functionProject =
                  projectUsers.filter((projectUser) => {
                    return (
                      projectUser.userID.includes(user._id as string) &&
                      projectUser.projectID.includes(project._id as string)
                    )
                  })[0].functionProject === 'manager'
                    ? 'Gestor'
                    : 'Colaborador'
                return (
                  <div key={index}>
                    <li className={'flex text-xs justify-center'}>
                      <span>{`${user.firstName} ${user.lastName} (${functionProject}) - ${user.occupation}`}</span>
                    </li>
                    <li className={'flex text-xs justify-center'}>
                      <span>{user.email}</span>
                    </li>
                    <li className={'flex text-xs justify-center'}>
                      <span>{`${user.company}`}</span>
                    </li>
                  </div>
                )
              })}
          </div>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Projeto: </label>
            <span>{project.title}</span>
          </li>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Descrição: </label>
            <div className={'flex flex-col'}>
              {project?.description
                ?.split('\n')
                .map((descriptionLine, index) => (
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
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Custo do Projeto: </label>
            <span className={'text-justify'}>
              {brazilReal.format(project.cost)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
