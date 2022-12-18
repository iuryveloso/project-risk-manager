import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderView from '@components/task/view/Header'
import PageView from '@components/task/view/Page'
import useTaskData from '@data/hook/useTask'
import { empty, TaskInterface } from '@interfaces/taskInterfaces'
import useUserData from '@data/hook/useUser'
import useProjectUserData from '@data/hook/useProjectUser'
import UserInterface, { empty as emptyUser } from '@interfaces/userInterfaces'
import {
  ProjectUserInterface,
  empty as emptyProjectUser,
} from '@interfaces/projectUserInterfaces'
import { useRouter } from 'next/router'

export default function View() {
  const [task, setTask] = useState<TaskInterface>(empty())
  const [user, setUser] = useState<UserInterface>(emptyUser())
  const [projectUser, setProjectUser] = useState<ProjectUserInterface>(
    emptyProjectUser()
  )

  const router = useRouter()
  const projectID = router.query.projectID as string
  const parentTaskID = router.query.parentTaskID as string
  const typeTask = router.query.typeTask as string

  const { getTask } = useTaskData({
    projectID,
    taskID: parentTaskID,
    setTask,
  })

  const { get } = useUserData({ setUser })

  const { getProjectUser } = useProjectUserData({
    setProjectUser,
    userID: user._id,
    projectID,
  })

  useEffect(() => {
    get()
  }, [])

  useEffect(() => {
    getProjectUser()
  }, [projectID, user])

  useEffect(() => {
    getTask()
  }, [parentTaskID])

  return (
    <Layout
      page={'Tarefas'}
      title={`Informações da Tarefa`}
      contentHeader={
        <>
          {typeTask === '1' && projectUser ? (
            <HeaderView
              projectID={projectID}
              parentTaskID={task.parentTaskID}
            />
          ) : (
            <HeaderView projectID={projectID} />
          )}
        </>
      }
    >
      {projectUser ? <PageView task={task} /> : false}
    </Layout>
  )
}
