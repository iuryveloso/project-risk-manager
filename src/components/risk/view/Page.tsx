import { chartRefInterface, RiskInterface } from '@interfaces/riskInterfaces'
import ChartPI from '@components/risk/ChartPI'
import { RefObject } from 'react'

interface PageInterface {
  negativeChartRef: RefObject<chartRefInterface>
  positiveChartRef: RefObject<chartRefInterface>
  risk?: RiskInterface
  higherImpacts: {
    negative: number
    positive: number
  }
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
  higherImpacts,
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
        <p className={'text-2xl font-bold'}> {risk?.title}</p>
      </div>
      <div className={'flex mb-4'}>
        <div className={'flex text-xl text-justify'}>
          <label className={'font-bold mr-1'}>Descrição: </label>
          <div className={'flex flex-col'}>
            {risk?.description?.split('\n').map((descriptionLine, index) => (
              <div key={index}>{descriptionLine}</div>
            ))}
          </div>
        </div>
      </div>
      <div className={'flex mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Categoria: </label>
          {risk?.category}
        </p>
      </div>
      <div className={'flex mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Causas: </label>
          {risk?.causes}
        </p>
      </div>
      <div className={'flex mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Observações: </label>
          {risk?.observations}
        </p>
      </div>
      <div className={'flex mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Status: </label>
          {risk?.status}
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
              {risk ? (
                <ChartPI
                  getChartLevel={getChartLevel}
                  impact={risk.impactNegative}
                  probability={risk.probabilityNegative}
                  type={'negative'}
                  chartRef={negativeChartRef}
                  higherImpacts={higherImpacts}
                />
              ) : (
                false
              )}
            </div>
          </div>
          <div className={'w-1/2'}>
            <div className={'ml-1'}>
              {risk ? (
                <ChartPI
                  getChartLevel={getChartLevel}
                  impact={risk.impactPositive}
                  probability={risk.probabilityPositive}
                  type={'positive'}
                  chartRef={positiveChartRef}
                  higherImpacts={higherImpacts}
                />
              ) : (
                false
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
