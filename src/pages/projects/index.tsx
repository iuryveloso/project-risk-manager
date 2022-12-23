import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderMain from '@components/project/main/Header'
import MainTable from '@components/project/main/table/Table'
import HeaderCreate from '@components/project/create/Header'
import FormCreate from '@components/project/create/Form'
import HeaderEdit from '@components/project/edit/Header'
import FormEdit from '@components/project/edit/Form'
import useProjectData from '@data/hook/useProject'
import useProjectUserData from '@data/hook/useProjectUser'
import useUserData from '@data/hook/useUser'
import {
  ProjectInterface,
  OrderInterface,
  empty,
} from '@interfaces/projectInterfaces'
import UserInterface, { empty as emptyUser } from '@interfaces/userInterfaces'
import { ProjectUserInterface } from '@interfaces/projectUserInterfaces'

export default function Projects() {
  const [mode, setMode] = useState<'main' | 'create' | 'edit'>('main')
  const [project, setProject] = useState<ProjectInterface>(empty())
  const [user, setUser] = useState<UserInterface>(emptyUser())
  const [projects, setProjects] = useState<ProjectInterface[]>([])
  const [projectUsers, setProjectUsers] = useState<ProjectUserInterface[]>([])
  const [allProjects, setAllProjects] = useState<ProjectInterface[]>([])
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderInterface>({
    column: 'title',
    direction: 'asc',
  })

  const { getUser } = useUserData({ setUser })

  const {
    newProject,
    search,
    selectProject,
    deleteProject,
    switchMode,
    saveProject,
    listProjects,
    orderBy,
  } = useProjectData({
    projectUsers,
    setMode,
    projects,
    setProject,
    setProjects,
    allProjects,
    setAllProjects,
    setError,
    setMessage,
    setOrder,
  })

  const { listProjectUsers } = useProjectUserData({
    setProjectUsers,
    userID: user._id,
  })

  useEffect(() => {
    getUser()
  }, [])
  useEffect(() => {
    listProjectUsers()
  }, [user])
  useEffect(() => {
    listProjects()
  }, [projectUsers])

  useEffect(() => {
    if (mode === 'main') setProject(empty())
  }, [mode])

  return (
    <Layout
      page={'Projetos'}
      title={'Projetos Cadastrados'}
      contentHeader={
        <>
          <HeaderMain
            newProject={newProject}
            search={search}
            mode={mode}
            error={error}
            message={message}
            deleteMessage={deleteMessage}
            projectsLength={projects.length}
            allProjectsLength={allProjects.length}
          />
          <HeaderCreate
            mode={mode}
            project={project}
            saveProject={saveProject}
            switchMode={switchMode}
            error={error}
            message={message}
          />
          <HeaderEdit
            mode={mode}
            project={project}
            saveProject={saveProject}
            switchMode={switchMode}
            error={error}
            message={message}
          />
        </>
      }
    >
      <MainTable
        projects={projects}
        deleteProject={deleteProject}
        mode={mode}
        selectProject={selectProject}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        deleteMessage={deleteMessage}
        setDeleteMessage={setDeleteMessage}
      />
      <FormCreate
        project={project}
        setProject={setProject}
        mode={mode}
        saveProject={saveProject}
      />
      <FormEdit
        project={project}
        setProject={setProject}
        mode={mode}
        saveProject={saveProject}
      />
    </Layout>
  )
}
