import User from '@api/User'
import UserInterface from '@interfaces/userInterfaces'
import { Dispatch, SetStateAction } from 'react'

interface useUserInterface {
  mode?: 'login' | 'singup'
  user?: UserInterface
  users?: UserInterface[]
  setUser?: Dispatch<SetStateAction<UserInterface>>
  setUsers?: Dispatch<SetStateAction<UserInterface[]>>
  setSearchedUsers?: Dispatch<SetStateAction<UserInterface[]>>
  setError?: Dispatch<SetStateAction<string | null>>
  setMessage?: Dispatch<SetStateAction<string | null>>
  setCheckAuth?: Dispatch<SetStateAction<boolean>>
  setMode?: Dispatch<SetStateAction<'password' | 'main' | 'edit'>>
}

export default function useUser({
  setError,
  setMessage,
  user,
  users,
  setUser,
  setUsers,
  setSearchedUsers,
  setMode,
}: useUserInterface) {
  async function getAll() {
    if (setUsers) {
      await User.list().then((e) => setUsers(e))
    }
  }

  async function get() {
    if (setUser) {
      await User.get().then((e) => setUser(e))
    }
  }

  function search(searchTag: string) {
    if (searchTag === '') {
      if (setSearchedUsers) {
        setSearchedUsers([])
      }
    } else {
      const query = users?.filter(
        (user) =>
          user?.firstName?.toLowerCase().includes(searchTag.toLowerCase()) ||
          user?.lastName?.toLowerCase().includes(searchTag.toLowerCase()) ||
          user?.email?.toLowerCase().includes(searchTag.toLowerCase()) ||
          user?.occupation?.toLowerCase().includes(searchTag.toLowerCase()) ||
          user?.company?.toLowerCase().includes(searchTag.toLowerCase())
      )
      if (setSearchedUsers) {
        setSearchedUsers(query ?? [])
      }
    }
  }

  async function update() {
    await User.update(user ?? {}).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
        if (setMode) setMode('main')
      }
    })
  }
  async function updateAvatar(avatar: File) {
    await User.updateAvatar(avatar ?? {}).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
      }
    })
  }
  async function updatePassword() {
    await User.updatePassword(user ?? {}).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
        if (setMode) setMode('main')
      }
    })
  }

  function showError(message: any, seconds = 3) {
    if (setError) {
      setError(message)
      setTimeout(() => setError(null), seconds * 1000)
    }
  }
  function showMessage(message: any, seconds = 3) {
    if (setMessage) {
      setMessage(message)
      setTimeout(() => setMessage(null), seconds * 1000)
    }
  }
  return {
    getAll,
    search,
    get,
    update,
    updateAvatar,
    updatePassword,
  }
}
