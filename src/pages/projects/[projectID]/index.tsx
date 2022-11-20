import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderView from '@components/project/view/Header'
import PageView from '@components/project/view/Page'
import useProjectData from '@data/hook/useProject'
import useRiskData from '@data/hook/useRisk'
import useTaskData from '@data/hook/useTask'
import useUserData from '@data/hook/useUser'
import useActionData from '@data/hook/useAction'
import { ProjectInterface, empty } from '@interfaces/projectInterfaces'
import { useRouter } from 'next/router'
import UserInterface, { empty as emptyUser } from '@interfaces/userInterfaces'
import { RiskInterface } from '@interfaces/riskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import { ActionInterface } from '@interfaces/actionInterfaces'

export default function Project() {
  const router = useRouter()
  const [project, setProject] = useState<ProjectInterface>(empty())
  const [user, setUser] = useState<UserInterface>(emptyUser())
  const [risks, setRisks] = useState<RiskInterface[]>([])
  const [actions, setActions] = useState<ActionInterface[]>([])
  const [tasks, setTasks] = useState<TaskInterface[]>([])
  const [subTasks, setSubTasks] = useState<TaskInterface[]>([])
  const projectID = router.query.projectID as string

  const { getProject, generatePDF } = useProjectData({ setProject, projectID })

  const { getAllRisks, getChartLevel } = useRiskData({ setRisks, projectID })

  const { getLiterallyAllActions } = useActionData({ setActions })

  const { getTasks } = useTaskData({ setTasks, setSubTasks, projectID })

  const { get } = useUserData({ setUser })

  useEffect(() => {
    get()
    getProject()
    getTasks()
    getAllRisks()
    getLiterallyAllActions()
  }, [projectID])

  return (
    <Layout
      page={'Projeto'}
      title={'Informações do Projeto'}
      subtitle={'Visualize e gerencie seu projeto'}
      contentHeader={
        <HeaderView
          getChartLevel={getChartLevel}
          projectID={projectID}
          generatePDF={generatePDF}
          project={project}
          risks={risks}
          user={user}
          tasks={tasks}
          subTasks={subTasks}
          actions={actions}
        />
      }
    >
      <PageView project={project} />
    </Layout>
  )
}
