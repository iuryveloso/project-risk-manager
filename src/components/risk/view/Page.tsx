import { RiskInterface } from '@interfaces/riskInterfaces'
import { checkShieldIcon } from '@components/icons'
import { useRouter } from 'next/router'

interface PageInterface {
  projectID: string
  risk: RiskInterface
}

export default function Page({ projectID, risk }: PageInterface) {
  const router = useRouter()
  return (
    <div
      className={`
            w-full
            flex-grow
            bg-slate-200 dark:bg-slate-700 p-4 
        `}
    >
      <h1></h1>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-2xl font-bold text-center'}> {risk.title}</p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-2xl text-justify'}>
          <label className={'font-bold'}>Descrição: </label>
          {risk.description}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-2xl text-justify'}>
          <label className={'font-bold'}>Categoria: </label>
          {risk.category}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-2xl text-justify'}>
          <label className={'font-bold'}>Causas: </label>
          {risk.causes}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-2xl text-justify'}>
          <label className={'font-bold'}>Observações: </label>
          {risk.observations}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-2xl text-justify'}>
          <label className={'font-bold'}>Probabilidade: </label>
          {risk.probability}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-2xl text-justify'}>
          <label className={'font-bold'}>Impacto: </label>
          {risk.impact}
        </p>
      </div>
      <div className={'flex mb-4 flex-grow'}>
        <button
          className={`
                    focus:border-indigo-700 dark:focus:border-indigo-600
                    text-slate-50 px-3 py-2 mt-2 rounded-lg
                    flex flex-grow justify-center mr-1
                    bg-cyan-600 hover:bg-cyan-700 
                    dark:bg-cyan-500 dark:hover:bg-cyan-600
                `}
          onClick={() =>
            router.push(`/projects/${projectID}/risks/${risk._id}/actions`)
          }
        >
          <div className={'flex'}>
            <span className={'mr-2'}>{checkShieldIcon}</span>
            <span>Ações do Risco</span>
          </div>
        </button>
      </div>
    </div>
  )
}
