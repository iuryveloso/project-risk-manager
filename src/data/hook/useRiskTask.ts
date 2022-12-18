import { Dispatch, SetStateAction } from 'react'
import RiskTask from '@api/RiskTask'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'

interface useRiskTaskInterface {
  riskID?: string
  taskID?: string
  getTasks?: () => Promise<void>
  getAllRisks?: () => Promise<void>
  setRiskTasks?: Dispatch<SetStateAction<RiskTaskInterface[]>>
  setMessage?: Dispatch<SetStateAction<string | null>>
}

export default function useRiskTask({
  riskID,
  taskID,
  getTasks,
  getAllRisks,
  setRiskTasks,
  setMessage,
}: useRiskTaskInterface) {
  async function getRiskTask() {
    await RiskTask.list(riskID as string).then((e) => {
      if (setRiskTasks) {
        setRiskTasks(e)
      }
    })
  }

  async function getRiskTaskByTask() {
    await RiskTask.listByTask(taskID as string).then((e) => {
      if (setRiskTasks) {
        setRiskTasks(e)
      }
    })
  }

  async function saveRiskTask(riskTask: RiskTaskInterface) {
    await RiskTask.create(riskTask).then((e) => showMessage(e.message))
    if (getTasks) {
      getTasks()
      getRiskTask()
    }
    if (getAllRisks) {
      getRiskTaskByTask()
      getAllRisks()
    }
  }
  async function deleteRiskTask(riskTask: RiskTaskInterface) {
    await RiskTask.delete(riskTask).then((e) => showMessage(e.message))
    if (getTasks) {
      getTasks()
      getRiskTask()
    }
    if (getAllRisks) {
      getRiskTaskByTask()
      getAllRisks()
    }
  }
  function showMessage(message: any, seconds = 3) {
    if (setMessage) {
      setMessage(message)
      setTimeout(() => setMessage(null), seconds * 1000)
    }
  }

  return {
    getRiskTask,
    getRiskTaskByTask,
    saveRiskTask,
    deleteRiskTask,
  }
}
