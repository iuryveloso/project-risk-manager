import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderView from '@components/action/view/Header'
import PageView from '@components/action/view/Page'
import useActionData from '@data/hook/useAction'
import { useRouter } from 'next/router'
import { ActionInterface, empty } from '@interfaces/actionInterfaces'

export default function Risk() {
  const router = useRouter()
  const projectID = router.query.projectID as string
  const riskID = router.query.riskID as string
  const actionID = router.query.actionID as string

  const [action, setAction] = useState<ActionInterface>(empty())

  const { getAction } = useActionData({ actionID, setAction })

  useEffect(() => {
    getAction()
  }, [riskID, projectID])

  return (
    <Layout
      page={'Ação'}
      title={'Informações da Ação'}
      subtitle={'Visualize as informações da ação'}
      contentHeader={<HeaderView projectID={projectID} riskID={riskID} />}
    >
      <PageView action={action} />
    </Layout>
  )
}
