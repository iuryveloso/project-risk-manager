import { Dispatch, SetStateAction } from 'react'
import ProjectUser from '@api/ProjectUser'
import { ProjectUserInterface } from '@interfaces/projectUserInterfaces'

interface useProjectUserInterface {
  userID?: string
  projectID?: string
  setProjectUsers?: Dispatch<SetStateAction<ProjectUserInterface[]>>
  setProjectUser?: Dispatch<SetStateAction<ProjectUserInterface>>
  setMessage?: Dispatch<SetStateAction<string | null>>
}

export default function useProjectUser({
  userID,
  projectID,
  setProjectUsers,
  setProjectUser,
  setMessage,
}: useProjectUserInterface) {
  function getAllProjectUser() {
    ProjectUser.list(userID as string).then((e) => {
      if (setProjectUsers) {
        setProjectUsers(e)
      }
    })
  }

  function getAllProjectUserByProject() {
    ProjectUser.listByProject(projectID as string).then((e) => {
      if (setProjectUsers) {
        setProjectUsers(e)
      }
    })
  }

  function getProjectUser() {
    ProjectUser.get(userID as string, projectID as string).then((e) => {
      if (setProjectUser) {
        setProjectUser(e)
      }
    })
  }

  function saveProjectUser(projectUser: ProjectUserInterface) {
    ProjectUser.create(projectUser).then((e) => showMessage(e.message))
  }
  function deleteProjectUser(projectUser: ProjectUserInterface) {
    ProjectUser.delete(projectUser).then((e) => showMessage(e.message))
  }
  function showMessage(message: any, seconds = 3) {
    if (setMessage) {
      setMessage(message)
      setTimeout(() => setMessage(null), seconds * 1000)
    }
  }

  return {
    getAllProjectUser,
    getAllProjectUserByProject,
    getProjectUser,
    saveProjectUser,
    deleteProjectUser,
  }
}
