import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { ForwardedRef } from 'react'
import { Scatter } from 'react-chartjs-2'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

interface ChartPIInterface {
  chartRef?: ForwardedRef<any>
  impact: number
  probability: number
  type: 'negative' | 'positive'
  getChartLevel: (
    impact: number,
    probability: number,
    type: 'negative' | 'positive'
  ) => {
    label: string
    hexColor: string
  }
}

export default function ChartPI({
  impact,
  probability,
  type,
  getChartLevel,
  chartRef,
}: ChartPIInterface) {
  // const plugin = {
  //   id: 'custom_canvas_background_color',
  //   beforeDraw: (chart: any) => {
  //     const { ctx } = chart
  //     ctx.save()
  //     ctx.globalCompositeOperation = 'destination-over'
  //     ctx.fillStyle = 'white'
  //     ctx.fillRect(0, 0, chart.width, chart.height)
  //     ctx.restore()
  //   },
  // }
  const options = {
    scales: {
      x: {
        beginAtZero: true,
        suggestedMax: 100,
        title: {
          display: true,
          text: 'PROBABILIDADE',
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        title: {
          display: true,
          text: 'IMPACTO',
        },
      },
    },
    // plugins: {
    //   title: {
    //     display: true,
    //     text: 'Custom Chart Title',
    //     color: getChartLevel(impact, probability, type).hexColor,
    //     padding: {
    //       top: 10,
    //       bottom: 30,
    //     },
    //   },
    // },
  }
  const data = {
    datasets: [
      {
        label: 'Probabilidade x Impacto',
        data: [
          {
            x: probability,
            y: impact,
          },
        ],
        backgroundColor: getChartLevel(impact, probability, type).hexColor,
      },
    ],
  }
  return (
    <div className={'flex flex-col bg-white p-2 rounded-md'}>
      <div className={'ml-14'}>
        <label className={'font-semibold text-slate-800'}>Nível: </label>
        <label
          className={`font-bold`}
          style={{ color: getChartLevel(impact, probability, type).hexColor }}
        >
          {getChartLevel(impact, probability, type).label}
        </label>
      </div>
      <div>
        <Scatter
          data={data}
          options={options}
          // plugins={[plugin]}
          ref={chartRef}
        />
      </div>
    </div>
  )
}
