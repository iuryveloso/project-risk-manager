import { RiskInterface } from '@interfaces/riskInterfaces'
import logo from '@public/images/logo.png'
import Image from 'next/image'
import { ProjectInterface } from '@interfaces/projectInterfaces'
import UserInterface from '@interfaces/userInterfaces'

interface ExportInteface {
  risk: RiskInterface
  project: ProjectInterface
  user: UserInterface
}

export default function Export({ risk, project, user }: ExportInteface) {
  const brazilReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  return (
    <div style={{ width: '34rem', fontFamily: 'sans-serif' }}>
      <div className={'flex flex-col text-black'}>
        <div className={'flex justify-center'}>
          <div className={'mr-3 flex justify-center'}>
            <Image src={logo} width={60} height={60} />
          </div>
          <div className={'flex pt-1'}>
            <h1 className={'text-2xl font-bold '}>
              Gerenciador de Riscos de Projetos
            </h1>
          </div>
        </div>
        <div className={'flex justify-center'}>
          <h3 className={'text-xl font-bold'}>Relatório de Risco</h3>
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
          <li className={'flex mb-5 text-sm justify-center'}>
            <label className={'font-bold mr-2 text-'}>Projeto: </label>
            <span>{project.title}</span>
          </li>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Risco: </label>
            <span>{risk.title}</span>
          </li>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Descrição: </label>
            <div className={'flex flex-col'}>
              {risk.description.split('\n').map((descriptionLine, index) => (
                <div key={index}>{descriptionLine}</div>
              ))}
            </div>
          </li>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Categoria: </label>
            <span className={'text-justify'}>{risk.category}</span>
          </li>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Causas: </label>
            <span className={'text-justify'}>{risk.causes}</span>
          </li>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Ameaça: </label>
          </li>
          <li className={'flex text-xs ml-3'}>
            <label className={'font-bold mr-2'}>Impacto: </label>
            <span className={'text-justify'}>
              {brazilReal.format(risk.impactNegative)}
            </span>
            <label className={'font-bold mr-2 ml-3'}>Probabilidade: </label>
            <span className={'text-justify'}>{risk.probabilityNegative}%</span>
          </li>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Oportunidade: </label>
          </li>
          <li className={'flex text-xs ml-3'}>
            <label className={'font-bold mr-2'}>Impacto: </label>
            <span className={'text-justify'}>
              {brazilReal.format(risk.impactPositive)}
            </span>
            <label className={'font-bold mr-2 ml-3'}>Probabilidade: </label>
            <span className={'text-justify'}>{risk.probabilityPositive}%</span>
          </li>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Observação: </label>
            <span className={'text-justify'}>{risk.observations}</span>
          </li>
          <li className={'flex text-xs'}>
            <label className={'font-bold mr-2'}>Status: </label>
            <span className={'text-justify'}>{risk.status}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
