import Image from 'next/image'
import { useRouter } from 'next/router'
import loadingImage from '@public/images/loading.gif'
import useAuth from '@data/hook/useAuth'
import { useEffect, useState } from 'react'

export default function ForceAuth(props: { children: any }) {
  const router = useRouter()
  const [checkAuth, setCheckAuth] = useState(true)
  const { check, loading } = useAuth({ setCheckAuth })

  useEffect(() => {
    check()
  }, [])

  useEffect(() => {
    if (!checkAuth) {
      router.push('/auth')
    }
  }, [checkAuth])

  function renderLoading() {
    return (
      <div
        className={`
                flex justify-center items-center h-screen z-50 bg-white dark:bg-slate-800
            `}
      >
        <Image src={loadingImage} alt="Loading" width={100} height={100} />
      </div>
    )
  }

  return (
    <>
      <div>{loading ? renderLoading() : props.children}</div>
    </>
  )
}
