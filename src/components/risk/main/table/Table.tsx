import { Dispatch, SetStateAction } from 'react'
import Header from '@components/risk/main/table/Header'
import Data from '@components/risk/main/table/Data'
import { RiskInterface, OrderInterface } from '@interfaces/riskInterfaces'

interface TableInterface {
  projectID: string
  mode: 'main' | 'create' | 'edit'
  risks: RiskInterface[]
  selectRisk: (risk: RiskInterface) => void
  deleteRisk: (risk: RiskInterface) => void
  order: OrderInterface
  setOrder: Dispatch<SetStateAction<OrderInterface>>
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
  orderBy: (
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) => void
}

export default function Table({
  projectID,
  mode,
  risks,
  selectRisk,
  deleteRisk,
  order,
  setOrder,
  orderBy,
  deleteMessage,
  setDeleteMessage,
}: TableInterface) {
  return (
    <div className={`${mode === 'main' ? '' : 'hidden'}`}>
      <table
        className={'w-full  overflow-hidden text-slate-900 dark:text-slate-300'}
      >
        <thead
          className={`
                    bg-slate-300 dark:bg-slate-900 
                    `}
        >
          <Header order={order} orderBy={orderBy} setOrder={setOrder} />
        </thead>
        <tbody>
          {risks?.map((risk, index) => {
            return (
              <Data
                projectID={projectID}
                key={index}
                index={index}
                risk={risk}
                deleteRisk={deleteRisk}
                selectRisk={selectRisk}
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
