import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderView from '@components/project/view/Header'
import PageView from '@components/project/view/Page'
import useProjectData from '@data/hook/useProject'
import useRiskData from '@data/hook/useRisk'
import useUserData from '@data/hook/useUser'
import useProjectUserData from '@data/hook/useProjectUser'
import useActionData from '@data/hook/useAction'
import { ProjectInterface, empty } from '@interfaces/projectInterfaces'
import { useRouter } from 'next/router'
import UserInterface, { empty as emptyUser } from '@interfaces/userInterfaces'
import { RiskInterface } from '@interfaces/riskInterfaces'
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
  const [higherImpacts, setHigherImpacts] = useState<{
    negative: number
    positive: number
  }>({ negative: 0, positive: 0 })
  const [actions, setActions] = useState<ActionInterface[]>([])
  const projectID = router.query.projectID as string

  const { getProject, generatePDF } = useProjectData({
    setProject,
    projectID,
    projectUser,
  })

  const { listRisks, getChartLevel, getRisksCost, listHigherImpacts } =
    useRiskData({
      setRisks,
      projectID,
      higherImpacts,
      setHigherImpacts,
      setRisksCost,
    })

  const { listAllActions } = useActionData({ setActions })

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
    listRisks()
    listProjectUsersByProject()
    listHigherImpacts()
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
              actions={actions}
              projectUser={projectUser}
              projectUsers={projectUsers}
              risksCost={risksCost}
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
