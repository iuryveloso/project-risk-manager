import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderMain from '@components/action/main/Header'
import MainTable from '@components/action/main/table/Table'
import HeaderCreate from '@components/action/create/Header'
import FormCreate from '@components/action/create/Form'
import HeaderEdit from '@components/action/edit/Header'
import FormEdit from '@components/action/edit/Form'
import useActionData from '@data/hook/useAction'
import {
  ActionInterface,
  OrderInterface,
  empty,
} from '@interfaces/actionInterfaces'
import { useRouter } from 'next/router'

export default function Actions() {
  const [mode, setMode] = useState<'main' | 'create' | 'edit'>('main')
  const [action, setAction] = useState<ActionInterface>(empty())
  const [actions, setActions] = useState<ActionInterface[]>([])
  const [allActions, setAllActions] = useState<ActionInterface[]>([])
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderInterface>({
    column: 'title',
    direction: 'asc',
  })

  const router = useRouter()
  const riskID = router.query.riskID as string
  const projectID = router.query.projectID as string

  const {
    newAction,
    search,
    selectAction,
    deleteAction,
    switchMode,
    saveAction,
    getAllActions,
    orderBy,
  } = useActionData({
    riskID,
    setMode,
    actions,
    setAction,
    setActions,
    allActions,
    setAllActions,
    setError,
    setMessage,
    setOrder,
  })

  useEffect(() => {
    getAllActions()
  }, [riskID])

  useEffect(() => {
    if (mode === 'main') setAction(empty())
  }, [mode])

  return (
    <Layout
      page={'Ações'}
      title={'Ações do Risco'}
      subtitle={'Visualize, edite e adicione novas informações às ações'}
      contentHeader={
        <>
          <HeaderMain
            riskID={riskID}
            projectID={projectID}
            newAction={newAction}
            search={search}
            mode={mode}
            error={error}
            message={message}
            deleteMessage={deleteMessage}
            actionsLength={actions.length}
            allActionsLength={allActions.length}
          />
          <HeaderCreate
            mode={mode}
            action={action}
            saveAction={saveAction}
            switchMode={switchMode}
            error={error}
            message={message}
          />
          <HeaderEdit
            mode={mode}
            action={action}
            saveAction={saveAction}
            switchMode={switchMode}
            error={error}
            message={message}
          />
        </>
      }
    >
      <MainTable
        actions={actions}
        deleteAction={deleteAction}
        mode={mode}
        selectAction={selectAction}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        deleteMessage={deleteMessage}
        setDeleteMessage={setDeleteMessage}
      />
      <FormCreate
        action={action}
        setAction={setAction}
        mode={mode}
        saveAction={saveAction}
      />
      <FormEdit
        action={action}
        setAction={setAction}
        mode={mode}
        saveAction={saveAction}
      />
    </Layout>
  )
}
