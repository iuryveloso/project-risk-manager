import { NextPage } from 'next'
import Layout from '@components/template/Layout'
import useUserData from '@data/hook/useUser'
import { useEffect, useState } from 'react'
import UserInterface, { empty } from '@interfaces/userInterfaces'
import Link from 'next/link'

const Home: NextPage = () => {
  const [user, setUser] = useState<UserInterface>(empty())
  const { getUser } = useUserData({ setUser })

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Layout page={'Inicio'}>
      <div className={'flex flex-col h-screen items-center justify-center'}>
        <h3
          className={'text-2xl font-medium'}
        >{`Olá, ${user.firstName} ${user.lastName}. Bem vindo (a) ao Gerenciador de Riscos de Projetos!`}</h3>
        <p className={'text-xl font-light'}>
          Use o menu lateral para navegar pelo sistema, ou clique nos links
          abaixo:
        </p>
        <p className={'text-lg mt-5'}>
          Clique em{' '}
          <Link href={'/projects'} className={'text-blue-500 underline underline-offset-1'}>
              Projetos
          </Link>{' '}
          para gerenciar seus projetos e riscos
        </p>
        <p className={'text-lg'}>
          Clique em{' '}
          <Link href={'/instructions'} className={'text-blue-500 underline underline-offset-1'}>
              Instruções
          </Link>{' '}
          para ler as instruções de usos do sistema
        </p>
        <p className={'text-lg'}>
          Clique em{' '}
          <Link href={'/profile'} className={'text-blue-500 underline underline-offset-1'}>
              Perfil
          </Link>{' '}
          para editar seus dados de usuário
        </p>
      </div>
      <div className={'my-7'} />
    </Layout>
  )
}

export default Home
