import { RiskInterface } from '@interfaces/riskInterfaces'
import { Dispatch, SetStateAction } from 'react'
import Actions from '@components/risk/main/table/Actions'

interface DataInterface {
  projectID: string
  risk: RiskInterface
  selectRisk: (risk: RiskInterface) => void
  deleteRisk: (risk: RiskInterface) => void
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
  getChartLevel: (
    impact: number,
    probability: number,
    type: 'negative' | 'positive'
  ) => {
    label: string
    hexColor: string
  }
}

export default function Data({
  projectID,
  risk,
  selectRisk,
  deleteRisk,
  deleteMessage,
  setDeleteMessage,
  getChartLevel,
}: DataInterface) {
  return (
    <tr key={risk._id}>
      <td className={'text-left p-1 pl-4'}>{risk.title}</td>
      <td className={'text-justify p-1'}>{risk.description}</td>
      <td className={'text-justify p-1'}>{risk.category}</td>
      <td className={'text-justify p-1'}>{risk.causes}</td>
      <td
        className={'text-justify p-1'}
        style={{
          color: getChartLevel(
            risk.impactNegative,
            risk.probabilityNegative,
            'negative'
          ).hexColor,
        }}
      >
        {
          getChartLevel(
            risk.impactNegative,
            risk.probabilityNegative,
            'negative'
          ).label
        }
      </td>
      <td
        className={'text-justify p-1'}
        style={{
          color: getChartLevel(
            risk.impactPositive,
            risk.probabilityPositive,
            'positive'
          ).hexColor,
        }}
      >
        {
          getChartLevel(
            risk.impactPositive,
            risk.probabilityPositive,
            'positive'
          ).label
        }
      </td>
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
