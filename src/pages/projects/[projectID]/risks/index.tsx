import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderMain from '@components/project/main/Header'
import MainTable from '@components/project/main/table/Table'
import HeaderView from '@components/project/view/Header'
import PageView from '@components/project/view/Page'
import HeaderCreate from '@components/project/create/Header'
import FormCreate from '@components/project/create/Form'
import HeaderEdit from '@components/project/edit/Header'
import FormEdit from '@components/project/edit/Form'
import useProjectData from '@data/hook/useProject'
import {
  ProjectInterface,
  OrderInterface,
  empty,
} from '@interfaces/projectInterfaces'
import { useRouter } from 'next/router'

export default function Projetos() {
  const [mode, setMode] = useState<'main' | 'create' | 'edit' | 'view'>('main')
  const [project, setProject] = useState<ProjectInterface>(empty())
  const [projects, setProjects] = useState<ProjectInterface[]>([])
  const [allProjects, setAllProjects] = useState<ProjectInterface[]>([])
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderInterface>({
    column: 'title',
    direction: 'asc',
  })
  const router = useRouter()

  const {
    newProject,
    search,
    viewProject,
    selectProject,
    deleteProject,
    switchMode,
    saveProject,
    getAllProjects,
    orderBy,
  } = useProjectData({
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

  useEffect(() => {
    getAllProjects()
  }, [])

  return (
    <Layout
      page={'Projetos'}
      title={`Projetos Cadastrados project=${router.query.projectID}`}
      subtitle={
        'Visualize, edite e adicione novas informações aos seus projetos'
      }
      globalHeader={
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
          <HeaderView
            mode={mode}
            project={project}
            saveProject={saveProject}
            switchMode={switchMode}
            error={error}
            message={message}
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
        viewProject={viewProject}
        selectProject={selectProject}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        deleteMessage={deleteMessage}
        setDeleteMessage={setDeleteMessage}
      />
      <PageView
        project={project}
        setProject={setProject}
        mode={mode}
        saveProject={saveProject}
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
