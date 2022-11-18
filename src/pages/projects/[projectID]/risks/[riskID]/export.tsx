import { useEffect, useRef, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useRouter } from 'next/router'
import JsPDF from 'jspdf'
import Formtask from '@components/risk/export/FormTask'
import useRiskData from '@data/hook/useRisk'
import { RiskInterface, empty } from '@interfaces/riskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import { downloadIcon, leftArrowIcon } from '@components/icons'

export default function Risks() {
  const [risk, setRisk] = useState<RiskInterface>(empty())
  const [tasks, setTasks] = useState<TaskInterface[]>([])
  const [subTasks, setSubTasks] = useState<TaskInterface[]>([])
  const [riskTasks, setRiskTasks] = useState<RiskTaskInterface[]>([])

  const pdfElement = useRef(null)

  const router = useRouter()
  const projectID = router.query.projectID as string
  const riskID = router.query.riskID as string

  const { getRiskTask, getTasks } = useRiskData({
    projectID,
    setRisk,
    setTasks,
    setSubTasks,
    setRiskTasks,
  })

  useEffect(() => {
    getTasks()
    getRiskTask(riskID as string)
  }, [riskID])

  function generatePDF() {
    const report = new JsPDF('portrait', 'pt', 'a4')
    // if (pdfElement.current !== null) {
    // }
    report
      .html(
        renderToStaticMarkup(
          <div className={'bg-white'}>
            <Formtask
              risk={risk}
              tasks={tasks}
              subTasks={subTasks}
              riskTasks={riskTasks}
            />
          </div>
        )
      )
      .then(() => {
        report.save('relatorio_de_risco.pdf')
      })
  }

  return (
    <div className={' flex flex-col items-center bg-slate-500 h-screen'}>
      <div className={'flex'}>
        <div className={'flex my-3'}>
          <button
            className={`
                          focus:border-indigo-700 dark:focus:border-indigo-600
                          text-slate-50 px-3 py-2 mt-2 rounded-lg mr-1
                          flex flex-grow justify-center
                          bg-red-600 hover:bg-red-700 
                          dark:bg-red-500 dark:hover:bg-red-600
                      `}
            onClick={() =>
              router.push(`/projects/${projectID}/risks/${riskID}`)
            }
          >
            <div className={'flex'}>
              <span className={'mr-2'}>{leftArrowIcon}</span>
              <span>Voltar</span>
            </div>
          </button>
          <button
            className={`
                        focus:border-indigo-700 dark:focus:border-indigo-600
                        text-slate-50 px-3 py-2 mt-2 rounded-lg ml-1
                        flex flex-grow justify-center
                        bg-green-600 hover:bg-green-700 
                        dark:bg-green-500 dark:hover:bg-green-600
                    `}
            onClick={() => generatePDF()}
          >
            <div className={'flex'}>
              <span className={'mr-2'}>{downloadIcon}</span>
              <span>Salvar como PDF</span>
            </div>
          </button>
        </div>
      </div>
      <div className={'bg-white p-5 rounded-lg'}>
        <div className={'bg-white'} ref={pdfElement}>
          <Formtask
            risk={risk}
            tasks={tasks}
            subTasks={subTasks}
            riskTasks={riskTasks}
          />
        </div>
      </div>
    </div>
  )
}
