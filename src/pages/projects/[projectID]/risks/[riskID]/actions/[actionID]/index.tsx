import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderView from '@components/action/view/Header'
import PageView from '@components/action/view/Page'
import useActionData from '@data/hook/useAction'
import useUserData from '@data/hook/useUser'
import useProjectUserData from '@data/hook/useProjectUser'
import { ActionInterface, empty } from '@interfaces/actionInterfaces'
import UserInterface, { empty as emptyUser } from '@interfaces/userInterfaces'
import {
  ProjectUserInterface,
  empty as emptyProjectUser,
} from '@interfaces/projectUserInterfaces'
import { useRouter } from 'next/router'

export default function Risk() {
  const router = useRouter()
  const projectID = router.query.projectID as string
  const riskID = router.query.riskID as string
  const actionID = router.query.actionID as string

  const [action, setAction] = useState<ActionInterface>(empty())
  const [user, setUser] = useState<UserInterface>(emptyUser())
  const [projectUser, setProjectUser] = useState<ProjectUserInterface>(
    emptyProjectUser()
  )

  const { getAction } = useActionData({ actionID, setAction })

  const { getUser } = useUserData({ setUser })

  const { getProjectUser } = useProjectUserData({
    setProjectUser,
    userID: user._id,
    projectID,
  })

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    getProjectUser()
  }, [projectID, user])

  useEffect(() => {
    getAction()
  }, [riskID, projectID])

  return (
    <Layout
      page={'Ação'}
      title={'Informações da Ação'}
      contentHeader={
        <>
          {projectUser ? (
            <HeaderView projectID={projectID} riskID={riskID} />
          ) : (
            false
          )}
        </>
      }
    >
      <>{projectUser ? <PageView action={action} /> : false}</>
    </Layout>
  )
}
