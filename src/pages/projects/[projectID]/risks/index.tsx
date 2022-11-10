import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderMain from '@components/risk/main/Header'
import MainTable from '@components/risk/main/table/Table'
import HeaderCreate from '@components/risk/create/Header'
import FormCreate from '@components/risk/create/Form'
import HeaderEdit from '@components/risk/edit/Header'
import FormEdit from '@components/risk/edit/Form'
import useRiskData from '@data/hook/useRisk'
import {
  RiskInterface,
  OrderInterface,
  empty,
} from '@interfaces/riskInterfaces'
import { useRouter } from 'next/router'

export default function Risks() {
  const [mode, setMode] = useState<'main' | 'create' | 'edit'>('main')
  const [risk, setRisk] = useState<RiskInterface>(empty())
  const [risks, setRisks] = useState<RiskInterface[]>([])
  const [allRisks, setAllRisks] = useState<RiskInterface[]>([])
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderInterface>({
    column: 'title',
    direction: 'asc',
  })

  const router = useRouter()
  const projectID = router.query.projectID as string

  const {
    newRisk,
    search,
    selectRisk,
    deleteRisk,
    switchMode,
    saveRisk,
    getAllRisks,
    orderBy,
  } = useRiskData({
    projectID,
    setMode,
    risks,
    setRisk,
    setRisks,
    allRisks,
    setAllRisks,
    setError,
    setMessage,
    setOrder,
  })

  useEffect(() => {
    getAllRisks()
  }, [projectID])

  return (
    <Layout
      page={'Riscos'}
      title={'Riscos do Projeto'}
      subtitle={'Visualize, edite e adicione novas informações aos riscos'}
      globalHeader={
        <>
          <HeaderMain
            projectID={projectID}
            newRisk={newRisk}
            search={search}
            mode={mode}
            error={error}
            message={message}
            deleteMessage={deleteMessage}
            risksLength={risks.length}
            allRisksLength={allRisks.length}
          />
          <HeaderCreate
            mode={mode}
            risk={risk}
            saveRisk={saveRisk}
            switchMode={switchMode}
            error={error}
            message={message}
          />
          <HeaderEdit
            mode={mode}
            risk={risk}
            saveRisk={saveRisk}
            switchMode={switchMode}
            error={error}
            message={message}
          />
        </>
      }
    >
      <MainTable
        projectID={projectID}
        risks={risks}
        deleteRisk={deleteRisk}
        mode={mode}
        selectRisk={selectRisk}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        deleteMessage={deleteMessage}
        setDeleteMessage={setDeleteMessage}
      />
      <FormCreate
        risk={risk}
        setRisk={setRisk}
        mode={mode}
        saveRisk={saveRisk}
      />
      <FormEdit risk={risk} setRisk={setRisk} mode={mode} saveRisk={saveRisk} />
    </Layout>
  )
}
