import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderView from '@components/risk/view/Header'
import PageView from '@components/risk/view/Page'
import useRiskData from '@data/hook/useRisk'
import { RiskInterface, empty } from '@interfaces/riskInterfaces'
import { useRouter } from 'next/router'

export default function Risk() {
  const router = useRouter()
  const projectID = router.query.projectID as string
  const riskID = router.query.riskID as string

  const [risk, setRisk] = useState<RiskInterface>(empty())
  const { getRisk } = useRiskData({ setRisk, riskID })

  useEffect(() => {
    getRisk()
  }, [riskID])

  return (
    <Layout
      page={'Risco'}
      title={'Informações do Risco'}
      subtitle={'Visualize e gerencie o risco'}
      globalHeader={<HeaderView projectID={projectID} />}
    >
      <PageView projectID={projectID} risk={risk} />
    </Layout>
  )
}
