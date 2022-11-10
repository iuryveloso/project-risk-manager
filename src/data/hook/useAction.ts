import { Dispatch, SetStateAction } from 'react'
import Action from '@api/Action'
import { ActionInterface, OrderInterface } from '@interfaces/actionInterfaces'
import { faker } from '@faker-js/faker'

interface useActionInterface {
  setMode?: Dispatch<SetStateAction<'main' | 'create' | 'edit'>>
  riskID?: string
  setAction?: Dispatch<SetStateAction<ActionInterface>>
  actions?: ActionInterface[]
  setActions?: Dispatch<SetStateAction<ActionInterface[]>>
  allActions?: ActionInterface[]
  setAllActions?: Dispatch<SetStateAction<ActionInterface[]>>
  setError?: Dispatch<SetStateAction<string | null>>
  setMessage?: Dispatch<SetStateAction<string | null>>
  setOrder?: Dispatch<SetStateAction<OrderInterface>>
}

export default function useAction({
  setMode,
  riskID,
  setAction,
  actions,
  setActions,
  allActions,
  setAllActions,
  setError,
  setMessage,
  setOrder,
}: useActionInterface) {
  function getAllActions() {
    Action.list(riskID as string).then((e) => {
      if (setActions) {
        setActions(e)
      }
      if (setAllActions) {
        setAllActions(e)
      }
    })
  }

  function newAction() {
    if (setAction && setMode) {
      const titleGenerated = faker.lorem.words()
      const action: ActionInterface = {
        title: `${titleGenerated.charAt(0).toUpperCase()}${titleGenerated.slice(
          1
        )}`,
        description: faker.lorem.paragraph(),
        type: faker.word.noun(),
        responsible: `${faker.name.firstName()} ${faker.name.lastName()}`,
        status: faker.word.adjective(),
        observation: faker.lorem.words(),
      }
      setAction(action)
      switchMode('create')
    }
  }

  function orderBy(
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) {
    if (setActions && actions && setOrder) {
      setActions(
        actions.sort((a, b) => {
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
  function selectAction(action: ActionInterface) {
    if (setAction) {
      setAction(action)
    }
    switchMode('edit')
  }

  function saveAction(action: ActionInterface) {
    console.log(riskID)
    if (!action._id) {
      Action.create({ ...action, riskID }).then((e) => setAlert(e))
    } else {
      Action.update({ ...action, riskID }).then((e) => setAlert(e))
    }
  }

  function deleteAction(action: ActionInterface) {
    Action.delete(action._id as string).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
        getAllActions()
      }
    })
  }

  function search(searchTag: string) {
    if (searchTag === '') {
      if (setActions) {
        setActions(allActions ?? [])
      }
    } else {
      const query = allActions?.filter(
        (action) =>
          action.title.toLowerCase().includes(searchTag.toLowerCase()) ||
          action.description.toLowerCase().includes(searchTag.toLowerCase()) ||
          action.type.toLowerCase().includes(searchTag.toLowerCase()) ||
          action.responsible.toLowerCase().includes(searchTag.toLowerCase()) ||
          action.status.toLowerCase().includes(searchTag.toLowerCase()) ||
          action.observation.toLowerCase().includes(searchTag.toLowerCase())
      )
      if (setActions) {
        setActions(query ?? [])
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
        getAllActions()
      }
    }
  }
  return {
    newAction,
    selectAction,
    saveAction,
    deleteAction,
    search,
    switchMode,
    getAllActions,
    orderBy,
  }
}
