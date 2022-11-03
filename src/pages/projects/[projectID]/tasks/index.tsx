import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderMain from '@components/task/main/Header'
import MainTable from '@components/task/main/table/Table'
import HeaderCreate from '@components/task/create/Header'
import FormCreate from '@components/task/create/Form'
import HeaderEdit from '@components/task/edit/Header'
import FormEdit from '@components/task/edit/Form'
import useTaskData from '@data/hook/useTask'
import {
  TaskInterface,
  OrderInterface,
  empty,
} from '@interfaces/taskInterfaces'
import { useRouter } from 'next/router'

export default function Tarefas() {
  const [mode, setMode] = useState<'main' | 'create' | 'edit'>('main')
  const [task, setTask] = useState<TaskInterface>(empty())
  const [tasks, setTasks] = useState<TaskInterface[]>([])
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
    getAllTasks,
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

  useEffect(() => {
    getAllTasks()
  }, [projectID])

  return (
    <Layout
      page={'Tarefas'}
      title={`Tarefas Cadastradas`}
      subtitle={'Visualize, edite e adicione novas informações às suas tarefas'}
      globalHeader={
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
      }
    >
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
      <FormEdit task={task} setTask={setTask} mode={mode} saveTask={saveTask} />
    </Layout>
  )
}
