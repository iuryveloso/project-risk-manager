import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderMain from '@components/task/main/Header'
import MainTable from '@components/task/main/table/Table'
import HeaderCreate from '@components/task/create/Header'
import FormCreate from '@components/task/create/Form'
import HeaderEdit from '@components/task/edit/Header'
import FormEdit from '@components/task/edit/Form'
import useTaskData from '@data/hook/useTask'
import useUserData from '@data/hook/useUser'
import useProjectUserData from '@data/hook/useProjectUser'
import {
  TaskInterface,
  OrderInterface,
  empty,
} from '@interfaces/taskInterfaces'
import { useRouter } from 'next/router'
import UserInterface, { empty as emptyUser } from '@interfaces/userInterfaces'
import {
  ProjectUserInterface,
  empty as emptyProjectUser,
} from '@interfaces/projectUserInterfaces'

export default function Tasks() {
  const [mode, setMode] = useState<'main' | 'create' | 'edit'>('main')
  const [task, setTask] = useState<TaskInterface>(empty())
  const [tasks, setTasks] = useState<TaskInterface[]>([])
  const [user, setUser] = useState<UserInterface>(emptyUser())
  const [projectUser, setProjectUser] = useState<ProjectUserInterface>(
    emptyProjectUser()
  )
  const [allTasks, setAllTasks] = useState<TaskInterface[]>([])
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderInterface>({
    column: 'begin',
    direction: 'asc',
  })
  const router = useRouter()
  const projectID = router.query.projectID as string

  const {
    newTask,
    back,
    search,
    selectTask,
    deleteTask,
    switchMode,
    saveTask,
    listTasksOrSubtasks,
    orderBy,
  } = useTaskData({
    setMode,
    tasks,
    setTask,
    setTasks,
    allTasks,
    setAllTasks,
    setError,
    setMessage,
    setOrder,
    projectID,
  })

  const { getUser } = useUserData({ setUser })

  const { getProjectUser } = useProjectUserData({
    setProjectUser,
    userID: user._id,
    projectID,
  })

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    listTasksOrSubtasks()
  }, [projectID])

  useEffect(() => {
    getProjectUser()
  }, [projectID, user])

  useEffect(() => {
    if (mode === 'main') setTask(empty())
  }, [mode])

  return (
    <Layout
      page={'Tarefas'}
      title={`Tarefas do Projeto`}
      contentHeader={
        <>
          {projectUser?.functionProject === 'manager' ? (
            <>
              <HeaderMain
                newTask={newTask}
                back={back}
                search={search}
                mode={mode}
                error={error}
                message={message}
                deleteMessage={deleteMessage}
                tasksLength={tasks.length}
                allTasksLength={allTasks.length}
              />
              <HeaderCreate
                mode={mode}
                task={task}
                saveTask={saveTask}
                switchMode={switchMode}
                error={error}
                message={message}
              />
              <HeaderEdit
                mode={mode}
                task={task}
                saveTask={saveTask}
                switchMode={switchMode}
                error={error}
                message={message}
              />
            </>
          ) : (
            false
          )}
        </>
      }
    >
      {projectUser?.functionProject === 'manager' ? (
        <>
          <MainTable
            tasks={tasks}
            projectID={projectID}
            deleteTask={deleteTask}
            mode={mode}
            selectTask={selectTask}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            deleteMessage={deleteMessage}
            setDeleteMessage={setDeleteMessage}
          />
          <FormCreate
            task={task}
            setTask={setTask}
            mode={mode}
            saveTask={saveTask}
          />
          <FormEdit
            task={task}
            setTask={setTask}
            mode={mode}
            saveTask={saveTask}
          />
        </>
      ) : (
        false
      )}
    </Layout>
  )
}
