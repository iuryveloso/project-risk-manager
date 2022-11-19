import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderView from '@components/task/view/Header'
import PageView from '@components/task/view/Page'
import useTaskData from '@data/hook/useTask'
import { empty, TaskInterface } from '@interfaces/taskInterfaces'
import { useRouter } from 'next/router'

export default function View() {
  const [task, setTask] = useState<TaskInterface>(empty())

  const router = useRouter()
  const projectID = router.query.projectID as string
  const parentTaskID = router.query.parentTaskID as string
  const typeTask = router.query.typeTask as string

  const { getTask } = useTaskData({
    projectID,
    taskID: parentTaskID,
    setTask,
  })

  useEffect(() => {
    getTask()
  }, [parentTaskID])

  return (
    <Layout
      page={'Tarefas'}
      title={`Informações da Tarefa`}
      subtitle={'Visualize as informações da tarefa'}
      contentHeader={
        <>
          {typeTask === '1' ? (
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
      <PageView task={task} />
    </Layout>
  )
}
