import { Dispatch, SetStateAction } from 'react'
import Header from '@components/action/main/table/Header'
import Data from '@components/action/main/table/Data'
import { ActionInterface, OrderInterface } from '@interfaces/actionInterfaces'

interface TableInterface {
  mode: 'main' | 'create' | 'edit'
  actions: ActionInterface[]
  selectAction: (action: ActionInterface) => void
  deleteAction: (action: ActionInterface) => void
  order: OrderInterface
  setOrder: Dispatch<SetStateAction<OrderInterface>>
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
  orderBy: (
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) => void
  projectID: string
  riskID: string
}

export default function Table({
  mode,
  actions,
  selectAction,
  deleteAction,
  order,
  setOrder,
  orderBy,
  deleteMessage,
  setDeleteMessage,
  projectID,
  riskID,
}: TableInterface) {
  return (
    <div className={`${mode === 'main' ? '' : 'hidden'}`}>
      <table
        className={`w-full  overflow-hidden text-slate-900 dark:text-slate-300 border-8 
       border-slate-300 dark:border-slate-900 bg-slate-100 dark:bg-slate-700`}
      >
        <thead
          className={`
                    bg-slate-300 dark:bg-slate-900 
                    `}
        >
          <Header order={order} orderBy={orderBy} setOrder={setOrder} />
        </thead>
        <tbody>
          {actions?.map((action, index) => {
            return (
              <Data
                projectID={projectID}
                riskID={riskID}
                key={index}
                action={action}
                deleteAction={deleteAction}
                selectAction={selectAction}
                deleteMessage={deleteMessage}
                setDeleteMessage={setDeleteMessage}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
