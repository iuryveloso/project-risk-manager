import { Dispatch, SetStateAction } from 'react'
import Risk from '@api/Risk'
import Task from '@api/Task'
import RiskTask from '@api/RiskTask'
import { RiskInterface, OrderInterface } from '@interfaces/riskInterfaces'
import { faker } from '@faker-js/faker'
import { TaskInterface } from '@interfaces/taskInterfaces'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'

interface useRiskInterface {
  setMode?: Dispatch<SetStateAction<'main' | 'create' | 'edit'>>
  projectID?: string
  riskID?: string
  setRisk?: Dispatch<SetStateAction<RiskInterface>>
  risks?: RiskInterface[]
  setRisks?: Dispatch<SetStateAction<RiskInterface[]>>
  setTasks?: Dispatch<SetStateAction<TaskInterface[]>>
  setSubTasks?: Dispatch<SetStateAction<TaskInterface[]>>
  setRiskTasks?: Dispatch<SetStateAction<RiskTaskInterface[]>>
  allRisks?: RiskInterface[]
  setAllRisks?: Dispatch<SetStateAction<RiskInterface[]>>
  setError?: Dispatch<SetStateAction<string | null>>
  setMessage?: Dispatch<SetStateAction<string | null>>
  setOrder?: Dispatch<SetStateAction<OrderInterface>>
}

export default function useRisk({
  setMode,
  projectID,
  riskID,
  setRisk,
  risks,
  setRisks,
  setTasks,
  setSubTasks,
  setRiskTasks,
  allRisks,
  setAllRisks,
  setError,
  setMessage,
  setOrder,
}: useRiskInterface) {
  function getAllRisks() {
    Risk.list(projectID as string).then((e) => {
      if (setRisks) {
        setRisks(e)
      }
      if (setAllRisks) {
        setAllRisks(e)
      }
    })
  }
  function getRisk() {
    if (riskID) {
      Risk.get(riskID as string).then((e) => {
        if (setRisk) {
          setRisk(e)
        }
      })
    }
  }

  function newRisk() {
    if (setRisk && setMode) {
      const titleGenerated = faker.lorem.words()
      const risk: RiskInterface = {
        title: `${titleGenerated.charAt(0).toUpperCase()}${titleGenerated.slice(
          1
        )}`,
        description: faker.lorem.paragraph(),
        category: faker.word.noun(),
        causes: faker.lorem.words(),
        probability: faker.datatype.float({ max: 100, precision: 0.01 }),
        impact: faker.datatype.float({ max: 100, precision: 0.01 }),
        observations: faker.lorem.words(),
      }
      setRisk(risk)
      switchMode('create')
    }
  }

  function orderBy(
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) {
    if (setRisks && risks && setOrder) {
      setRisks(
        risks.sort((a, b) => {
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

  function selectRisk(risk: RiskInterface) {
    if (setRisk) {
      setRisk(risk)
    }
    switchMode('edit')
  }

  function getRiskTask(riskID: string) {
    RiskTask.list(riskID).then((e) => {
      if (setRiskTasks) {
        setRiskTasks(e)
      }
    })
    Risk.get(riskID).then((e) => {
      if (setRisk) {
        setRisk(e)
      }
    })
  }
  function getTasks() {
    Task.list(projectID as string).then((e) => {
      if (setTasks) {
        setTasks(e)
      }
    })
    Task.listAllSubTasks(projectID as string).then((e) => {
      if (setSubTasks) {
        setSubTasks(e)
      }
    })
  }

  function saveRiskTask(riskTask: RiskTaskInterface) {
    RiskTask.create(riskTask).then((e) => showMessage(e.message))
  }
  function deleteRiskTask(riskTask: RiskTaskInterface) {
    RiskTask.delete(riskTask).then((e) => showMessage(e.message))
  }

  function saveRisk(risk: RiskInterface) {
    console.log(projectID)
    if (!risk._id) {
      Risk.create({ ...risk, projectID }).then((e) => setAlert(e))
    } else {
      Risk.update({ ...risk, projectID }).then((e) => setAlert(e))
    }
  }

  function deleteRisk(risk: RiskInterface) {
    Risk.delete(risk._id as string).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
        getAllRisks()
      }
    })
  }

  function search(searchTag: string) {
    if (searchTag === '') {
      if (setRisks) {
        setRisks(allRisks ?? [])
      }
    } else {
      const query = allRisks?.filter(
        (risk) =>
          risk.title.toLowerCase().includes(searchTag.toLowerCase()) ||
          risk.description.toLowerCase().includes(searchTag.toLowerCase()) ||
          risk.category.toLowerCase().includes(searchTag.toLowerCase()) ||
          risk.causes.toLowerCase().includes(searchTag.toLowerCase()) ||
          risk.observations.toLowerCase().includes(searchTag.toLowerCase())
      )
      if (setRisks) {
        setRisks(query ?? [])
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
        getAllRisks()
      }
    }
  }
  return {
    newRisk,
    selectRisk,
    getRiskTask,
    getTasks,
    saveRiskTask,
    deleteRiskTask,
    saveRisk,
    deleteRisk,
    search,
    switchMode,
    getRisk,
    getAllRisks,
    orderBy,
  }
}
