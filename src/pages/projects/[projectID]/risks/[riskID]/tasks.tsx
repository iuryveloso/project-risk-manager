import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import Headertask from '@components/risk/task/Header'
import Formtask from '@components/risk/task/Form'
import useRiskData from '@data/hook/useRisk'
import { RiskInterface, empty } from '@interfaces/riskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import { useRouter } from 'next/router'

export default function Risks() {
  const [risk, setRisk] = useState<RiskInterface>(empty())
  const [tasks, setTasks] = useState<TaskInterface[]>([])
  const [subTasks, setSubTasks] = useState<TaskInterface[]>([])
  const [riskTasks, setRiskTasks] = useState<RiskTaskInterface[]>([])
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const router = useRouter()
  const projectID = router.query.projectID as string
  const riskID = router.query.riskID as string

  const { getRiskTask, saveRiskTask, deleteRiskTask, getTasks } = useRiskData({
    projectID,
    setRisk,
    setTasks,
    setSubTasks,
    setRiskTasks,
    setError,
    setMessage,
  })
  useEffect(() => {
    getTasks()
    getRiskTask(riskID as string)
  }, [riskID])

  return (
    <Layout
      page={'Riscos'}
      title={`Vincular Tarefas à ${risk.title}`}
      subtitle={'Adicione e remova tarefas ao risco'}
      globalHeader={
        <>
          <Headertask projectID={projectID} error={error} message={message} />
        </>
      }
    >
      <Formtask
        risk={risk}
        saveRiskTask={saveRiskTask}
        deleteRiskTask={deleteRiskTask}
        tasks={tasks}
        subTasks={subTasks}
        riskTasks={riskTasks}
      />
    </Layout>
  )
}
