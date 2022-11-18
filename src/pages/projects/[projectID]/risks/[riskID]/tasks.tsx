import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import Headertask from '@components/risk/task/Header'
import Formtask from '@components/risk/task/Form'
import useRiskData from '@data/hook/useRisk'
import useTaskData from '@data/hook/useTask'
import useRiskTaskData from '@data/hook/useRiskTask'
import { RiskInterface, empty } from '@interfaces/riskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import { useRouter } from 'next/router'

export default function Risks() {
  const [risk, setRisk] = useState<RiskInterface>(empty())
  const [tasks, setTasks] = useState<TaskInterface[]>([])
  const [subTasks, setSubTasks] = useState<TaskInterface[]>([])
  const [riskTasks, setRiskTasks] = useState<RiskTaskInterface[]>([])
  const [message, setMessage] = useState<string | null>(null)

  const router = useRouter()
  const projectID = router.query.projectID as string
  const riskID = router.query.riskID as string

  const { getRisk } = useRiskData({
    riskID,
    setRisk,
  })

  const { getTasks } = useTaskData({ projectID, setTasks, setSubTasks })

  const { getRiskTask, saveRiskTask, deleteRiskTask } = useRiskTaskData({
    riskID,
    setRiskTasks,
    setMessage,
  })

  useEffect(() => {
    getRisk()
    getTasks()
    getRiskTask()
  }, [riskID])

  return (
    <Layout
      page={'Riscos'}
      title={`Vincular Tarefas à ${risk.title}`}
      subtitle={'Adicione e remova tarefas ao risco'}
      contentHeader={
        <>
          <Headertask projectID={projectID} message={message} />
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
