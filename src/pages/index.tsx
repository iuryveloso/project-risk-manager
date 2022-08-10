import { NextPage } from 'next'
import Layout from '@components/template/Layout'

const Home: NextPage = () => {
  return (
    <Layout
      page={'Inicio'}
      title={'Página Inicial'}
      subtitle={'Página em Construção!!'}
    ></Layout>
  )
}

export default Home
