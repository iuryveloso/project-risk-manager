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
  const [risksCost, setRisksCost] = useState(0)
  const [projectUsers, setProjectUsers] = useState<ProjectUserInterface[]>([])
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

  const { listRisks, getChartLevel, getRisksCost } = useRiskData({
    setRisks,
    projectID,
    setRisksCost,
  })

  const { listAllActions } = useActionData({ setActions })

  const { listTasksAndSubtasks } = useTaskData({
    setTasks,
    setSubTasks,
    projectID,
  })

  const { getUser, listUsers, search } = useUserData({
    setUser,
    setUsers,
    users,
    setSearchedUsers,
  })

  const {
    listProjectUsersByProject,
    saveProjectUser,
    deleteProjectUser,
    getProjectUser,
  } = useProjectUserData({
    projectID,
    userID: user._id,
    setProjectUser,
    setProjectUsers,
    listUsers,
  })

  useEffect(() => {
    getUser()
    listUsers()
    listAllActions()
  }, [])

  useEffect(() => {
    getProjectUser()
  }, [projectID, user])

  useEffect(() => {
    getProject()
  }, [projectID, projectUser])

  useEffect(() => {
    listTasksAndSubtasks()
    listRisks()
    listProjectUsersByProject()
    getRisksCost()
  }, [projectID])

  return (
    <Layout
      page={'Projeto'}
      title={'Informações do Projeto'}
      contentHeader={
        <>
          {projectUser ? (
            <HeaderView
              getChartLevel={getChartLevel}
              projectID={projectID}
              generatePDF={generatePDF}
              project={project}
              risks={risks}
              users={users}
              tasks={tasks}
              subTasks={subTasks}
              actions={actions}
              projectUser={projectUser}
              projectUsers={projectUsers}
            />
          ) : (
            false
          )}
        </>
      }
    >
      {projectUser ? (
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
          projectUser={projectUser}
          risksCost={risksCost}
        />
      ) : (
        false
      )}
    </Layout>
  )
}
