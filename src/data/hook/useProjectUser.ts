import { Dispatch, SetStateAction } from 'react'
import ProjectUser from '@api/ProjectUser'
import { ProjectUserInterface } from '@interfaces/projectUserInterfaces'

interface useProjectUserInterface {
  userID?: string
  projectID?: string
  listUsers?: () => Promise<void>
  setProjectUsers?: Dispatch<SetStateAction<ProjectUserInterface[]>>
  setProjectUser?: Dispatch<SetStateAction<ProjectUserInterface>>
  setMessage?: Dispatch<SetStateAction<string | null>>
}

export default function useProjectUser({
  userID,
  projectID,
  listUsers,
  setProjectUsers,
  setProjectUser,
  setMessage,
}: useProjectUserInterface) {
  async function listProjectUsers() {
    await ProjectUser.list(userID as string).then((e) => {
      if (setProjectUsers) {
        setProjectUsers(e)
      }
    })
  }

  async function listProjectUsersByProject() {
    await ProjectUser.listByProject(projectID as string).then((e) => {
      if (setProjectUsers) {
        setProjectUsers(e)
      }
    })
  }

  async function getProjectUser() {
    await ProjectUser.get(userID as string, projectID as string).then((e) => {
      if (setProjectUser) {
        setProjectUser(e)
      }
    })
  }

  async function saveProjectUser(projectUser: ProjectUserInterface) {
    await ProjectUser.create(projectUser).then((e) => showMessage(e.message))
    if (listUsers) {
      listProjectUsersByProject()
      listUsers()
    }
  }
  async function deleteProjectUser(projectUser: ProjectUserInterface) {
    await ProjectUser.delete(projectUser).then((e) => showMessage(e.message))
    if (listUsers) {
      listProjectUsersByProject()
      listUsers()
    }
  }
  function showMessage(message: any, seconds = 3) {
    if (setMessage) {
      setMessage(message)
      setTimeout(() => setMessage(null), seconds * 1000)
    }
  }

  return {
    listProjectUsers,
    listProjectUsersByProject,
    getProjectUser,
    saveProjectUser,
    deleteProjectUser,
  }
}
