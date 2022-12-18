import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import Headertask from '@components/risk/task/Header'
import Formtask from '@components/risk/task/Form'
import useRiskData from '@data/hook/useRisk'
import useTaskData from '@data/hook/useTask'
import useRiskTaskData from '@data/hook/useRiskTask'
import useUserData from '@data/hook/useUser'
import useProjectUserData from '@data/hook/useProjectUser'
import { RiskInterface, empty } from '@interfaces/riskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import UserInterface, { empty as emptyUser } from '@interfaces/userInterfaces'
import {
  ProjectUserInterface,
  empty as emptyProjectUser,
} from '@interfaces/projectUserInterfaces'
import { useRouter } from 'next/router'

export default function Risks() {
  const [risk, setRisk] = useState<RiskInterface>(empty())
  const [tasks, setTasks] = useState<TaskInterface[]>([])
  const [subTasks, setSubTasks] = useState<TaskInterface[]>([])
  const [riskTasks, setRiskTasks] = useState<RiskTaskInterface[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [user, setUser] = useState<UserInterface>(emptyUser())
  const [projectUser, setProjectUser] = useState<ProjectUserInterface>(
    emptyProjectUser()
  )

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
    getTasks,
  })

  const { get } = useUserData({ setUser })

  const { getProjectUser } = useProjectUserData({
    setProjectUser,
    userID: user._id,
    projectID,
  })

  useEffect(() => {
    get()
  }, [])

  useEffect(() => {
    getProjectUser()
  }, [projectID, user])

  useEffect(() => {
    getRisk()
    getRiskTask()
  }, [riskID])

  useEffect(() => {
    getTasks()
  }, [projectID])

  return (
    <Layout
      page={'Riscos'}
      title={`Vincular Tarefas à ${projectUser ? risk.title : '...'}`}
      contentHeader={
        <>
          {projectUser ? (
            <Headertask projectID={projectID} message={message} />
          ) : (
            false
          )}
        </>
      }
    >
      <>
        {projectUser ? (
          <Formtask
            risk={risk}
            saveRiskTask={saveRiskTask}
            deleteRiskTask={deleteRiskTask}
            tasks={tasks}
            subTasks={subTasks}
            riskTasks={riskTasks}
          />
        ) : (
          false
        )}
      </>
    </Layout>
  )
}
