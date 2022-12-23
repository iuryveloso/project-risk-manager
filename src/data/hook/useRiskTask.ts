import { Dispatch, SetStateAction } from 'react'
import RiskTask from '@api/RiskTask'
import { RiskTaskInterface } from '@interfaces/riskTaskInterfaces'

interface useRiskTaskInterface {
  riskID?: string
  taskID?: string
  listTasksAndSubtasks?: () => Promise<void>
  listRisks?: () => Promise<void>
  setRiskTasks?: Dispatch<SetStateAction<RiskTaskInterface[]>>
  setMessage?: Dispatch<SetStateAction<string | null>>
}

export default function useRiskTask({
  riskID,
  taskID,
  listTasksAndSubtasks,
  listRisks,
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
    await RiskTask.create(riskTask).then((e) => {
      if (listRisks) showMessage('Risco adicionado com sucesso!')
      else showMessage(e.message)
    })
    if (listTasksAndSubtasks) {
      await listTasksAndSubtasks()
      await getRiskTask()
    }
    if (listRisks) {
      await getRiskTaskByTask()
      await listRisks()
    }
  }
  async function deleteRiskTask(riskTask: RiskTaskInterface) {
    await RiskTask.delete(riskTask).then((e) => {
      if (listRisks) showMessage('Risco removido com sucesso!')
      else showMessage(e.message)
    })
    if (listTasksAndSubtasks) {
      await listTasksAndSubtasks()
      await getRiskTask()
    }
    if (listRisks) {
      await getRiskTaskByTask()
      await listRisks()
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
