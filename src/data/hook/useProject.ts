import { Dispatch, ReactElement, SetStateAction } from 'react'
import Project from '@api/Project'
import { ProjectInterface, OrderInterface } from '@interfaces/projectInterfaces'
import { faker } from '@faker-js/faker'
import { renderToString } from 'react-dom/server'
import JsPDF from 'jspdf'

interface useProjectInterface {
  setMode?: Dispatch<SetStateAction<'main' | 'create' | 'edit'>>
  projectID?: string
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
  projects,
  setProjects,
  allProjects,
  setAllProjects,
  setError,
  setMessage,
  setOrder,
}: useProjectInterface) {
  function getAllProjects() {
    Project.list().then((e) => {
      if (setProjects) {
        setProjects(e)
      }
      if (setAllProjects) {
        setAllProjects(e)
      }
    })
  }
  function getProject() {
    if (projectID) {
      Project.get(projectID as string).then((e) => {
        if (setProject) {
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
      setProjects(
        projects.sort((a, b) => {
          if (a[column].toLowerCase() > b[column].toLowerCase()) {
            if (direction === 'asc') {
              return 1
            } else {
              return -1
            }
          } else if (a[column].toLowerCase() < b[column].toLowerCase()) {
            if (direction === 'desc') {
              return 1
            } else {
              return -1
            }
          } else {
            return 0
          }
        })
      )
    }
  }

  function generatePDF(
    risk: ReactElement,
    task: ReactElement,
    main: ReactElement
  ) {
    const staticMain = renderToString(main)
    const staticTask = renderToString(task)
    const staticRisk = renderToString(risk)
    const doc = new JsPDF('portrait', 'pt', 'a4')

    doc
      .html(staticMain + staticRisk + staticTask, {
        autoPaging: 'text',
        margin: 25,
      })
      .then(() => {
        doc.save('Relatório de Projeto.pdf')
      })
  }

  function selectProject(project: ProjectInterface) {
    if (setProject) {
      setProject(project)
    }
    switchMode('edit')
  }

  function saveProject(project: ProjectInterface) {
    if (!project._id) {
      Project.create(project).then((e) => setAlert(e))
    } else {
      Project.update(project).then((e) => setAlert(e))
    }
  }

  function deleteProject(project: ProjectInterface) {
    Project.delete(project._id as string).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
        getAllProjects()
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
          project.description.toLowerCase().includes(searchTag.toLowerCase()) ||
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
        getAllProjects()
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
    getAllProjects,
    orderBy,
  }
}
