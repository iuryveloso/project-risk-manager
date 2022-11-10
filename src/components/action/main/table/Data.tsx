import { Dispatch, SetStateAction } from 'react'
import { ActionInterface } from '@interfaces/actionInterfaces'
import Actions from '@components/action/main/table/Actions'

interface DataInterface {
  action: ActionInterface
  index: number
  selectAction: (action: ActionInterface) => void
  deleteAction: (action: ActionInterface) => void
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
}

export default function Data({
  action,
  index,
  selectAction,
  deleteAction,
  deleteMessage,
  setDeleteMessage,
}: DataInterface) {
  return (
    <tr
      key={action._id}
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
      <td className={'text-left p-1 pl-4'}>{action.title}</td>
      <td className={'text-justify p-1'}>{action.description}</td>
      <td className={'text-justify p-1'}>{action.type}</td>
      <td className={'text-justify p-1'}>{action.responsible}</td>
      <td className={'text-justify p-1'}>{action.status}</td>
      <td className={'text-justify p-1'}>{action.observation}</td>
      <Actions
        action={action}
        deleteAction={deleteAction}
        selectAction={selectAction}
        deleteMessage={deleteMessage}
        setDeleteMessage={setDeleteMessage}
      />
    </tr>
  )
}
