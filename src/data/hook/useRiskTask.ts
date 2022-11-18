import { Dispatch, SetStateAction } from 'react'
import RiskTask from '@api/RiskTask'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'

interface useRiskTaskInterface {
  riskID?: string
  taskID?: string
  setRiskTasks?: Dispatch<SetStateAction<RiskTaskInterface[]>>
  setMessage?: Dispatch<SetStateAction<string | null>>
}

export default function useRiskTask({
  riskID,
  taskID,
  setRiskTasks,
  setMessage,
}: useRiskTaskInterface) {
  function getRiskTask() {
    RiskTask.list(riskID as string).then((e) => {
      if (setRiskTasks) {
        setRiskTasks(e)
      }
    })
  }

  function getRiskTaskByTask() {
    RiskTask.listByTask(taskID as string).then((e) => {
      if (setRiskTasks) {
        setRiskTasks(e)
      }
    })
  }

  function saveRiskTask(riskTask: RiskTaskInterface) {
    RiskTask.create(riskTask).then((e) => showMessage(e.message))
  }
  function deleteRiskTask(riskTask: RiskTaskInterface) {
    RiskTask.delete(riskTask).then((e) => showMessage(e.message))
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
