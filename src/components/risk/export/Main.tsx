import { RiskInterface } from '@interfaces/riskInterfaces'
import logo from '@public/images/logo.png'
import Image from 'next/image'
import { ProjectInterface } from '@interfaces/projectInterfaces'

interface ExportInteface {
  risk: RiskInterface
  project: ProjectInterface
}

export default function Export({ risk, project }: ExportInteface) {
  return (
    <div style={{ width: '34rem' }}>
      <div className={'flex flex-col text-black'}>
        <div className={'flex justify-center'}>
          <div className={'mr-3 flex justify-center'}>
            <Image src={logo} width={60} height={60} />
          </div>
          <div className={'flex flex-col'}>
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
            <span className={'text-justify'}>{risk.description}</span>
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
            <label className={'font-bold mr-2'}>Observação: </label>
            <span className={'text-justify'}>{risk.observations}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
