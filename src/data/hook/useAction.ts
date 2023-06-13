import { Dispatch, SetStateAction } from 'react'
import Action from '@api/Action'
import {
  ActionInterface,
  OrderInterface,
  empty,
} from '@interfaces/actionInterfaces'
// import { faker } from '@faker-js/faker'

interface useActionInterface {
  setMode?: Dispatch<SetStateAction<'main' | 'create' | 'edit'>>
  actionID?: string
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
  actionID,
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
  async function listActions() {
    await Action.list(riskID as string).then((e) => {
      if (setActions) {
        setActions(e)
      }
      if (setAllActions) {
        setAllActions(e)
      }
    })
  }

  async function listAllActions() {
    await Action.listAll().then((e) => {
      if (setActions) {
        setActions(e)
      }
    })
  }

  async function getAction() {
    await Action.get(actionID as string).then((e) => {
      if (setAction) {
        setAction(e)
      }
    })
  }

  // function newAction() {
  //   const randomType = () => {
  //     const number = Math.round(Math.random()) + 1
  //     switch (number) {
  //       case 1:
  //         return 'Ameaça'
  //       case 2:
  //         return 'Oportunidade'
  //       default:
  //         return 'Ameaça'
  //     }
  //   }
  //   const randomStatus = () => {
  //     const number = Math.round(Math.random() * 2) + 1
  //     switch (number) {
  //       case 1:
  //         return 'Pendente'
  //       case 2:
  //         return 'Em Andamento'
  //       case 3:
  //         return 'Concluído'
  //       default:
  //         return 'Pendente'
  //     }
  //   }
  //   if (setAction && setMode) {
  //     const titleGenerated = faker.lorem.words()
  //     const action: ActionInterface = {
  //       title: `${titleGenerated.charAt(0).toUpperCase()}${titleGenerated.slice(
  //         1
  //       )}`,
  //       description: faker.lorem.paragraph(),
  //       type: randomType(),
  //       responsible: `${faker.name.firstName()} ${faker.name.lastName()}`,
  //       status: randomStatus(),
  //       cost: +faker.finance.amount(),
  //       observation: faker.lorem.words(),
  //     }
  //     setAction(action)
  //     switchMode('create')
  //   }
  // }

  function newAction() {
    if (setAction) {
      setAction(empty())
      switchMode('create')
    }
  }

  function orderBy(
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) {
    if (setActions && actions && setOrder) {
      function getSortNumber(a: string | number, b: string | number) {
        if (a > b) {
          if (direction === 'asc') {
            return 1
          } else {
            return -1
          }
        } else if (a < b) {
          if (direction === 'desc') {
            return 1
          } else {
            return -1
          }
        } else {
          return 0
        }
      }
      setActions(
        actions.sort((a, b) => {
          if (column !== 'cost') {
            return getSortNumber(
              a[column].toLowerCase(),
              b[column].toLowerCase()
            )
          } else {
            return getSortNumber(a.cost, b.cost)
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

  async function saveAction(action: ActionInterface) {
    if (!action._id) {
      await Action.create({ ...action, riskID }).then((e) => setAlert(e))
    } else {
      await Action.update({ ...action, riskID }).then((e) => setAlert(e))
    }
  }

  async function deleteAction(action: ActionInterface) {
    await Action.delete(action._id as string).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
        listActions()
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
        listActions()
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
    getAction,
    listActions,
    listAllActions,
    orderBy,
  }
}
