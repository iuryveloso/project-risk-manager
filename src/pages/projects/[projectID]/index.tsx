import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderView from '@components/project/view/Header'
import PageView from '@components/project/view/Page'
import useProjectData from '@data/hook/useProject'
import useRiskData from '@data/hook/useRisk'
import useTaskData from '@data/hook/useTask'
import useUserData from '@data/hook/useUser'
import useProjectUserData from '@data/hook/useProjectUser'
import useActionData from '@data/hook/useAction'
import { ProjectInterface, empty } from '@interfaces/projectInterfaces'
import { useRouter } from 'next/router'
import UserInterface, { empty as emptyUser } from '@interfaces/userInterfaces'
import { RiskInterface } from '@interfaces/riskInterfaces'
import { TaskInterface } from '@interfaces/taskInterfaces'
import { ActionInterface } from '@interfaces/actionInterfaces'
import {
  ProjectUserInterface,
  empty as emptyprojectUser,
} from '@interfaces/projectUserInterfaces'

export default function Project() {
  const router = useRouter()
  const [project, setProject] = useState<ProjectInterface>(empty())
  const [user, setUser] = useState<UserInterface>(emptyUser())
  const [projectUserSelected, setprojectUserSelected] =
    useState<ProjectUserInterface>(emptyprojectUser())
  const [users, setUsers] = useState<UserInterface[]>([])
  const [searchedUsers, setSearchedUsers] = useState<UserInterface[]>([])
  const [projectUser, setProjectUser] = useState<ProjectUserInterface>(
    emptyprojectUser()
  )
  const [projectUsers, setProjectUsers] = useState<ProjectUserInterface[]>([])
  const [reRender, setReRender] = useState(0)
  const [risks, setRisks] = useState<RiskInterface[]>([])
  const [actions, setActions] = useState<ActionInterface[]>([])
  const [tasks, setTasks] = useState<TaskInterface[]>([])
  const [subTasks, setSubTasks] = useState<TaskInterface[]>([])
  const projectID = router.query.projectID as string

  const { getProject, generatePDF } = useProjectData({
    setProject,
    projectID,
    projectUser,
  })

  const { getAllRisks, getChartLevel } = useRiskData({ setRisks, projectID })

  const { getLiterallyAllActions } = useActionData({ setActions })

  const { getTasks } = useTaskData({ setTasks, setSubTasks, projectID })

  const { get, getAll, search } = useUserData({
    setUser,
    setUsers,
    users,
    setSearchedUsers,
  })

  const {
    getAllProjectUserByProject,
    saveProjectUser,
    deleteProjectUser,
    getProjectUser,
  } = useProjectUserData({
    projectID,
    userID: user._id,
    setProjectUser,
    setProjectUsers,
  })

  useEffect(() => {
    get()
    getLiterallyAllActions()
  }, [])

  useEffect(() => {
    getProjectUser()
  }, [projectID, user])

  useEffect(() => {
    getProject()
  }, [projectID, projectUser])

  useEffect(() => {
    getTasks()
    getAllRisks()
  }, [projectID])

  useEffect(() => {
    getAll()
    getAllProjectUserByProject()
  }, [reRender, projectID])
  return (
    <Layout
      page={'Projeto'}
      title={'Informações do Projeto'}
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
          projectUser={projectUser}
        />
      }
    >
      <PageView
        project={project}
        user={user}
        users={users}
        projectUserSelected={projectUserSelected}
        setprojectUserSelected={setprojectUserSelected}
        projectUsers={projectUsers}
        searchedUsers={searchedUsers}
        search={search}
        saveProjectUser={saveProjectUser}
        deleteProjectUser={deleteProjectUser}
        reRender={reRender}
        setReRender={setReRender}
        projectUser={projectUser}
      />
    </Layout>
  )
}
