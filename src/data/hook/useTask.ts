import { Dispatch, SetStateAction } from 'react'
import Task from '@api/Task'
import { TaskInterface, OrderInterface } from '@interfaces/taskInterfaces'
import { faker } from '@faker-js/faker'

interface useTaskInterface {
  setMode?: Dispatch<SetStateAction<'main' | 'create' | 'edit'>>
  setTask?: Dispatch<SetStateAction<TaskInterface>>
  tasks?: TaskInterface[]
  setTasks?: Dispatch<SetStateAction<TaskInterface[]>>
  setSubTasks?: Dispatch<SetStateAction<TaskInterface[]>>
  parentTask?: TaskInterface
  setParentTask?: Dispatch<SetStateAction<TaskInterface>>
  allTasks?: TaskInterface[]
  setAllTasks?: Dispatch<SetStateAction<TaskInterface[]>>
  setError?: Dispatch<SetStateAction<string | null>>
  setMessage?: Dispatch<SetStateAction<string | null>>
  setOrder?: Dispatch<SetStateAction<OrderInterface>>
  projectID: string
  parentTaskID?: string
  taskID?: string
}

export default function useTask({
  setMode,
  setTask,
  tasks,
  setTasks,
  setSubTasks,
  parentTask,
  setParentTask,
  allTasks,
  setAllTasks,
  setError,
  setMessage,
  setOrder,
  projectID,
  parentTaskID,
  taskID,
}: useTaskInterface) {
  async function getAllTasks() {
    if (parentTaskID) {
      await Task.listSubTasks(projectID, parentTaskID).then((e) => {
        if (setTasks) {
          setTasks(e)
        }
        if (setAllTasks) {
          setAllTasks(e)
        }
      })
    } else {
      await Task.list(projectID).then((e) => {
        if (setTasks) {
          setTasks(e)
        }
        if (setAllTasks) {
          setAllTasks(e)
        }
      })
    }
  }

  async function getTasks() {
    await Task.list(projectID as string).then((e) => {
      if (setTasks) {
        setTasks(e)
      }
    })
    await Task.listAllSubTasks(projectID as string).then((e) => {
      if (setSubTasks) {
        setSubTasks(e)
      }
    })
  }

  async function getParentTask() {
    if (parentTaskID && setParentTask) {
      await Task.get(parentTaskID).then((e) => {
        setParentTask(e)
      })
    }
  }

  async function getTask() {
    if (taskID && setTask) {
      await Task.get(taskID).then((e) => {
        setTask(e)
      })
    }
  }

  function newTask() {
    if (setTask && setMode) {
      const titleGenerated = faker.lorem.words()
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
      const task: TaskInterface = {
        title: `${titleGenerated.charAt(0).toUpperCase()}${titleGenerated.slice(
          1
        )}`,
        description: faker.lorem.paragraph(),
        responsible: `${faker.name.firstName()} ${faker.name.lastName()}`,
        begin: `${beginYear}-${beginMonth}-${beginDay}`,
        end: `${endYear}-${endMonth}-${endDay}`,
      }
      setTask(task)
      switchMode('create')
    }
  }

  function orderBy(
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) {
    if (setTasks && tasks && setOrder) {
      setTasks(
        tasks.sort((a, b) => {
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

  function selectTask(task: TaskInterface) {
    if (setTask) {
      setTask(task)
    }
    switchMode('edit')
  }

  async function saveTask(task: TaskInterface) {
    if (parentTaskID) {
      if (!task._id) {
        await Task.create({ ...task, projectID, parentTaskID }).then((e) =>
          setAlert(e)
        )
      } else {
        await Task.update({ ...task, projectID, parentTaskID }).then((e) =>
          setAlert(e)
        )
      }
    } else {
      if (!task._id) {
        await Task.create({ ...task, projectID }).then((e) => setAlert(e))
      } else {
        await Task.update({ ...task, projectID }).then((e) => setAlert(e))
      }
    }
  }

  async function deleteTask(task: TaskInterface) {
    await Task.delete(task._id as string).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
        getAllTasks()
      }
    })
  }

  function back() {
    if (parentTaskID && parentTask) {
      if (parentTask.parentTaskID) {
        return `/projects/${projectID}/tasks/${parentTask.parentTaskID}`
      } else {
        return `/projects/${projectID}/tasks`
      }
    } else {
      return `/projects/${projectID}`
    }
  }

  function search(searchTag: string) {
    if (searchTag === '') {
      if (setTasks) {
        setTasks(allTasks ?? [])
      }
    } else {
      const query = allTasks?.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTag.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTag.toLowerCase()) ||
          task.begin.toLowerCase().includes(searchTag.toLowerCase()) ||
          task.end.toLowerCase().includes(searchTag.toLowerCase())
      )
      if (setTasks) {
        setTasks(query ?? [])
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
        getAllTasks()
      }
    }
  }
  return {
    newTask,
    selectTask,
    getTask,
    getTasks,
    saveTask,
    deleteTask,
    back,
    search,
    switchMode,
    getParentTask,
    getAllTasks,
    orderBy,
  }
}
