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
import useUserData from '@data/hook/useUser'
import useProjectUserData from '@data/hook/useProjectUser'
import UserInterface, { empty as emptyUser } from '@interfaces/userInterfaces'
import {
  ProjectUserInterface,
  empty as emptyProjectUser,
} from '@interfaces/projectUserInterfaces'
import { useRouter } from 'next/router'

export default function Risks() {
  const [mode, setMode] = useState<'main' | 'create' | 'edit'>('main')
  const [risk, setRisk] = useState<RiskInterface>(empty())
  const [risks, setRisks] = useState<RiskInterface[]>([])
  const [allRisks, setAllRisks] = useState<RiskInterface[]>([])
  const [user, setUser] = useState<UserInterface>(emptyUser())
  const [projectUser, setProjectUser] = useState<ProjectUserInterface>(
    emptyProjectUser()
  )
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
    getChartLevel,
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

  const { get } = useUserData({ setUser })

  const { getProjectUser } = useProjectUserData({
    setProjectUser,
    userID: user._id,
    projectID,
  })

  useEffect(() => {
    get()
  }, [])

  useEffect(() => {
    getAllRisks()
  }, [projectID])

  useEffect(() => {
    getProjectUser()
  }, [projectID, user])

  useEffect(() => {
    if (mode === 'main') setRisk(empty())
  }, [mode])

  return (
    <Layout
      page={'Riscos'}
      title={'Riscos do Projeto'}
      contentHeader={
        <>
          {projectUser ? (
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
          ) : (
            false
          )}
        </>
      }
    >
      {projectUser ? (
        <>
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
            getChartLevel={getChartLevel}
          />
          <FormCreate
            risk={risk}
            setRisk={setRisk}
            mode={mode}
            saveRisk={saveRisk}
            getChartLevel={getChartLevel}
          />
          <FormEdit
            risk={risk}
            setRisk={setRisk}
            mode={mode}
            saveRisk={saveRisk}
            getChartLevel={getChartLevel}
          />
        </>
      ) : (
        false
      )}
    </Layout>
  )
}
