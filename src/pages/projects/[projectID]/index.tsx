import { useEffect, useState } from 'react'
import Layout from '@components/template/Layout'
import HeaderView from '@components/project/view/Header'
import PageView from '@components/project/view/Page'
import useProjectData from '@data/hook/useProject'
import { ProjectInterface, empty } from '@interfaces/projectInterfaces'
import { useRouter } from 'next/router'

export default function Project() {
  const router = useRouter()
  const [project, setProject] = useState<ProjectInterface>(empty())
  const projectID = router.query.projectID as string
  const { getProject } = useProjectData({ setProject, projectID })

  useEffect(() => {
    getProject()
  }, [projectID])

  return (
    <Layout
      page={'Projeto'}
      title={'Informações do Projeto'}
      subtitle={'Visualize e gerencie seu projeto'}
      globalHeader={<HeaderView />}
    >
      <PageView project={project} />
    </Layout>
  )
}
