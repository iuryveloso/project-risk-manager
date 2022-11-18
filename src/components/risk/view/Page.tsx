import { chartRefInterface, RiskInterface } from '@interfaces/riskInterfaces'
import ChartPI from '@components/risk/ChartPI'
import { RefObject } from 'react'

interface PageInterface {
  negativeChartRef: RefObject<chartRefInterface>
  positiveChartRef: RefObject<chartRefInterface>
  risk: RiskInterface
  getChartLevel: (
    impact: number,
    probability: number,
    type: 'negative' | 'positive'
  ) => {
    label: string
    hexColor: string
  }
}

export default function Page({
  risk,
  getChartLevel,
  negativeChartRef,
  positiveChartRef,
}: PageInterface) {
  return (
    <div
      className={`
            w-full
            flex-grow
            bg-slate-200 dark:bg-slate-700 p-4 
        `}
    >
      <div className={'flex mb-4 justify-center'}>
        <p className={'text-2xl font-bold'}> {risk.title}</p>
      </div>
      <div className={'flex mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Descrição: </label>
          {risk.description}
        </p>
      </div>
      <div className={'flex mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Categoria: </label>
          {risk.category}
        </p>
      </div>
      <div className={'flex mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Causas: </label>
          {risk.causes}
        </p>
      </div>
      <div className={'flex mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Observações: </label>
          {risk.observations}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <div className={'flex flex-col'}>
          <h1 className={'flex justify-center text-2xl font-bold'}>
            Matrizes de Probabilidade x Impacto
          </h1>
          <div className={'flex mb-1'}>
            <div className={'w-1/2 justify-center'}>
              <h2 className={'flex justify-center text-xl font-bold'}>
                Ameaça
              </h2>
            </div>
            <div className={'w-1/2 justify-center'}>
              <h2 className={'flex justify-center text-xl font-bold'}>
                Oportunidade
              </h2>
            </div>
          </div>
        </div>
        <div className={'flex'}>
          <div className={'w-1/2'}>
            <div className={'mr-1'}>
              <ChartPI
                getChartLevel={getChartLevel}
                impact={risk.impactNegative}
                probability={risk.probabilityNegative}
                type={'negative'}
                // chartRef={negativeChartRef}
              />
            </div>
          </div>
          <div className={'w-1/2'}>
            <div className={'ml-1'}>
              <ChartPI
                getChartLevel={getChartLevel}
                impact={risk.impactPositive}
                probability={risk.probabilityPositive}
                type={'positive'}
                // chartRef={positiveChartRef}
              />
            </div>
          </div>
        </div>
        <div
          className={' absolute left-30 top-20 invisible'}
          style={{ width: '80rem' }}
        >
          <div className={'w-1/2'}>
            <div className={'mr-1'}>
              <ChartPI
                getChartLevel={getChartLevel}
                impact={risk.impactNegative}
                probability={risk.probabilityNegative}
                type={'negative'}
                chartRef={negativeChartRef}
              />
            </div>
          </div>
          <div className={'w-1/2'}>
            <div className={'ml-1'}>
              <ChartPI
                getChartLevel={getChartLevel}
                impact={risk.impactPositive}
                probability={risk.probabilityPositive}
                type={'positive'}
                chartRef={positiveChartRef}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
