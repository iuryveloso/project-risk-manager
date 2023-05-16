import { Dispatch, ReactElement, SetStateAction } from 'react'
import Project from '@api/Project'
import { ProjectInterface, OrderInterface } from '@interfaces/projectInterfaces'
import { faker } from '@faker-js/faker'
import { renderToString } from 'react-dom/server'
import JsPDF from 'jspdf'
import { ProjectUserInterface } from '@interfaces/projectUserInterfaces'

interface useProjectInterface {
  setMode?: Dispatch<SetStateAction<'main' | 'create' | 'edit'>>
  projectID?: string
  projectUser?: ProjectUserInterface
  projectUsers?: ProjectUserInterface[]
  setProject?: Dispatch<SetStateAction<ProjectInterface>>
  projects?: ProjectInterface[]
  setProjects?: Dispatch<SetStateAction<ProjectInterface[]>>
  allProjects?: ProjectInterface[]
  setAllProjects?: Dispatch<SetStateAction<ProjectInterface[]>>
  setError?: Dispatch<SetStateAction<string | null>>
  setMessage?: Dispatch<SetStateAction<string | null>>
  setOrder?: Dispatch<SetStateAction<OrderInterface>>
}

export default function useProject({
  setMode,
  projectID,
  setProject,
  projectUser,
  projectUsers,
  projects,
  setProjects,
  allProjects,
  setAllProjects,
  setError,
  setMessage,
  setOrder,
}: useProjectInterface) {
  async function listProjects() {
    await Project.list().then((e: ProjectInterface[]) => {
      if (projectUsers) {
        const projectsFiltered = e
          .filter((project) => {
            return projectUsers.filter((projectUser) => {
              return projectUser.projectID.includes(project._id as string)
            }).length
          })
          .map((project) => {
            const projectUsersFiltered = projectUsers.filter((projectUser) => {
              return projectUser.projectID.includes(project._id as string)
            })[0]
            const projectWithFunctionProject: ProjectInterface = {
              ...project,
              functionProject: projectUsersFiltered.functionProject,
            }
            return projectWithFunctionProject
          })

        if (setProjects) {
          setProjects(projectsFiltered)
        }
        if (setAllProjects) {
          setAllProjects(projectsFiltered)
        }
      }
    })
  }
  async function getProject() {
    if (projectID && projectUser) {
      await Project.get(projectID as string).then((e: ProjectInterface) => {
        if (setProject && projectUser.projectID === e._id) {
          setProject(e)
        }
      })
    }
  }

  function newProject() {
    if (setProject && setMode) {
      const titleGenerated = faker.lorem.words()
      const occupationAreaGenerated = faker.lorem.words()
      const beginFullDate = new Date(faker.date.birthdate())
      const beginYear = beginFullDate.toLocaleString('default', {
        year: 'numeric',
      })
      const beginMonth = beginFullDate.toLocaleString('default', {
        month: '2-digit',
      })
      const beginDay = beginFullDate.toLocaleString('default', {
        day: '2-digit',
      })
      const endFullDate = new Date(faker.date.birthdate())
      const endYear = endFullDate.toLocaleString('default', { year: 'numeric' })
      const endMonth = endFullDate.toLocaleString('default', {
        month: '2-digit',
      })
      const endDay = endFullDate.toLocaleString('default', { day: '2-digit' })
      const project: ProjectInterface = {
        title: `${titleGenerated.charAt(0).toUpperCase()}${titleGenerated.slice(
          1
        )}`,
        description: faker.lorem.paragraph(),
        occupationArea: `${occupationAreaGenerated
          .charAt(0)
          .toUpperCase()}${occupationAreaGenerated.slice(1)}`,
        begin: `${beginYear}-${beginMonth}-${beginDay}`,
        end: `${endYear}-${endMonth}-${endDay}`,
        cost: +faker.finance.amount(),
      }
      setProject(project)
      switchMode('create')
    }
  }

  function orderBy(
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) {
    if (setProjects && projects && setOrder) {
      function getSortNumber(a: string | number, b: string | number) {
        if (a > b) {
          if (direction === 'asc') {
            return 1
          } else {
            return -1
          }
        } else if (a < b) {
          if (direction === 'desc') {
            return 1
          } else {
            return -1
          }
        } else {
          return 0
        }
      }
      setProjects(
        projects.sort((a, b) => {
          if (column !== 'cost') {
            return getSortNumber(
              a[column].toLowerCase(),
              b[column].toLowerCase()
            )
          } else {
            return getSortNumber(a.cost, b.cost)
          }
        })
      )
    }
  }

  function generatePDF(risk: ReactElement, main: ReactElement) {
    const staticMain = renderToString(main)
    const staticRisk = renderToString(risk)
    const doc = new JsPDF('portrait', 'pt', 'a4')

    doc
      .html(staticMain + staticRisk, {
        autoPaging: 'text',
        margin: 25,
      })
      .then(() => {
        doc.save('Relatório de Riscos do Projeto.pdf')
      })
  }

  function selectProject(project: ProjectInterface) {
    if (setProject) {
      setProject(project)
    }
    switchMode('edit')
  }

  async function saveProject(project: ProjectInterface) {
    if (!project._id) {
      await Project.create(project).then((e) => setAlert(e))
    } else {
      await Project.update(project).then((e) => setAlert(e))
    }
  }

  async function deleteProject(project: ProjectInterface) {
    await Project.delete(project._id as string).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
        listProjects()
      }
    })
  }

  function search(searchTag: string) {
    if (searchTag === '') {
      if (setProjects) {
        setProjects(allProjects ?? [])
      }
    } else {
      const query = allProjects?.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTag.toLowerCase()) ||
          project.occupationArea
            .toLowerCase()
            .includes(searchTag.toLowerCase()) ||
          project.begin.toLowerCase().includes(searchTag.toLowerCase()) ||
          project.end.toLowerCase().includes(searchTag.toLowerCase())
      )
      if (setProjects) {
        setProjects(query ?? [])
      }
    }
  }

  function setAlert(e: any) {
    if (e.error) {
      showError(e.error)
    } else if (e.message) {
      showMessage(e.message)
      switchMode('main')
    }
  }
  function showError(message: any, seconds = 3) {
    if (setError) {
      setError(message)
      setTimeout(() => setError(null), seconds * 1000)
    }
  }
  function showMessage(message: any, seconds = 3) {
    if (setMessage) {
      setMessage(message)
      setTimeout(() => setMessage(null), seconds * 1000)
    }
  }

  function switchMode(mode: 'main' | 'create' | 'edit') {
    if (setMode) {
      setMode(mode)
      if (mode === 'main') {
        listProjects()
      }
    }
  }
  return {
    newProject,
    selectProject,
    saveProject,
    deleteProject,
    generatePDF,
    search,
    switchMode,
    getProject,
    listProjects,
    orderBy,
  }
}
