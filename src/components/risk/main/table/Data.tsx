import { RiskInterface } from '@interfaces/riskInterfaces'
import { Dispatch, SetStateAction } from 'react'
import Actions from '@components/risk/main/table/Actions'

interface DataInterface {
  projectID: string
  risk: RiskInterface
  index: number
  selectRisk: (risk: RiskInterface) => void
  deleteRisk: (risk: RiskInterface) => void
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
}

export default function Data({
  projectID,
  risk,
  index,
  selectRisk,
  deleteRisk,
  deleteMessage,
  setDeleteMessage,
}: DataInterface) {
  return (
    <tr
      key={risk._id}
      className={`${
        index % 2 === 0
          ? `
                bg-slate-100
                dark:bg-slate-600
            `
          : `
                bg-slate-200
                dark:bg-slate-700
            `
      }`}
    >
      <td className={'text-left p-1 pl-4'}>{risk.title}</td>
      <td className={'text-justify p-1'}>{risk.description}</td>
      <td className={'text-justify p-1'}>{risk.category}</td>
      <td className={'text-justify p-1'}>{risk.causes}</td>
      <td className={'text-justify p-1'}>{risk.observations}</td>
      <Actions
        projectID={projectID}
        risk={risk}
        deleteRisk={deleteRisk}
        selectRisk={selectRisk}
        deleteMessage={deleteMessage}
        setDeleteMessage={setDeleteMessage}
      />
    </tr>
  )
}
