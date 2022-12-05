import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderRisk from '@components/task/risk/Header'
import FormRisk from '@components/task/risk/Form'
import useRiskData from '@data/hook/useRisk'
import useTaskData from '@data/hook/useTask'
import useRiskTaskData from '@data/hook/useRiskTask'
import { RiskInterface } from '@interfaces/riskInterfaces'
import { empty, TaskInterface } from '@interfaces/taskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import { useRouter } from 'next/router'

export default function Risks() {
  const [risks, setRisks] = useState<RiskInterface[]>([])
  const [task, setTask] = useState<TaskInterface>(empty())
  const [riskTasks, setRiskTasks] = useState<RiskTaskInterface[]>([])
  const [message, setMessage] = useState<string | null>(null)

  const router = useRouter()
  const projectID = router.query.projectID as string
  const parentTaskID = router.query.parentTaskID as string
  const typeTask = router.query.typeTask as string

  const { getAllRisks } = useRiskData({
    projectID,
    setRisks,
  })

  const { getTask } = useTaskData({
    projectID,
    taskID: parentTaskID,
    setTask,
  })

  const { getRiskTaskByTask, saveRiskTask, deleteRiskTask } = useRiskTaskData({
    taskID: parentTaskID,
    setRiskTasks,
    setMessage,
  })

  useEffect(() => {
    getTask()
    getAllRisks()
    getRiskTaskByTask()
  }, [parentTaskID])

  return (
    <Layout
      page={'Tarefas'}
      title={`Vincular Riscos à ${task.title}`}
      contentHeader={
        <>
          {typeTask === '1' ? (
            <HeaderRisk
              projectID={projectID}
              message={message}
              parentTaskID={task.parentTaskID}
            />
          ) : (
            <HeaderRisk projectID={projectID} message={message} />
          )}
        </>
      }
    >
      <FormRisk
        risks={risks}
        saveRiskTask={saveRiskTask}
        deleteRiskTask={deleteRiskTask}
        riskTasks={riskTasks}
        task={task}
      />
    </Layout>
  )
}
