import { ForwardedRef, useEffect, useRef, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderView from '@components/risk/view/Header'
import PageView from '@components/risk/view/Page'
import useRiskData from '@data/hook/useRisk'
import useTaskData from '@data/hook/useTask'
import useRiskTaskData from '@data/hook/useRiskTask'
import useProjectData from '@data/hook/useProject'
import useUserData from '@data/hook/useUser'
import useActionData from '@data/hook/useAction'
import {
  RiskInterface,
  empty as emptyRisk,
  chartRefInterface,
} from '@interfaces/riskInterfaces'
import { useRouter } from 'next/router'
import { TaskInterface } from '@interfaces/taskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'
import {
  ProjectInterface,
  empty as emptyProject,
} from '@interfaces/projectInterfaces'
import { ActionInterface } from '@interfaces/actionInterfaces'
import UserInterface, { empty as emptyUser } from '@interfaces/userInterfaces'

export default function Risk() {
  const router = useRouter()
  const projectID = router.query.projectID as string
  const riskID = router.query.riskID as string

  const [risk, setRisk] = useState<RiskInterface>(emptyRisk())
  const [subTasks, setSubTasks] = useState<TaskInterface[]>([])
  const [riskTasks, setRiskTasks] = useState<RiskTaskInterface[]>([])

  const [tasks, setTasks] = useState<TaskInterface[]>([])
  const [project, setProject] = useState<ProjectInterface>(emptyProject())
  const [actions, setActions] = useState<ActionInterface[]>([])
  const [user, setUser] = useState<UserInterface>(emptyUser())

  const negativeChartRef: ForwardedRef<chartRefInterface> = useRef(null)
  const positiveChartRef: ForwardedRef<chartRefInterface> = useRef(null)

  const { getChartLevel, generatePDF, getRisk } = useRiskData({
    projectID,
    setRisk,
    riskID,
  })

  const { getTasks } = useTaskData({ projectID, setTasks, setSubTasks })

  const { getRiskTask } = useRiskTaskData({ riskID, setRiskTasks })

  const { getProject } = useProjectData({ projectID, setProject })

  const { getAllActions } = useActionData({ riskID, setActions })

  const { get } = useUserData({ setUser })

  useEffect(() => {
    get()
    getRisk()
    getTasks()
    getProject()
    getAllActions()
    getRiskTask()
  }, [riskID, projectID])

  return (
    <Layout
      page={'Risco'}
      title={'Informações do Risco'}
      subtitle={'Visualize e gerencie o risco'}
      contentHeader={
        <HeaderView
          generatePDF={generatePDF}
          risk={risk}
          tasks={tasks}
          subTasks={subTasks}
          riskTasks={riskTasks}
          getChartLevel={getChartLevel}
          negativeChartRef={negativeChartRef}
          positiveChartRef={positiveChartRef}
          project={project}
          actions={actions}
          user={user}
        />
      }
    >
      <PageView
        risk={risk}
        getChartLevel={getChartLevel}
        negativeChartRef={negativeChartRef}
        positiveChartRef={positiveChartRef}
      />
    </Layout>
  )
}
