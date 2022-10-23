import User from '@api/User'
import UserInterface from '@interfaces/userInterface'
import { Dispatch, SetStateAction } from 'react'

interface useUserInterface {
  mode?: 'login' | 'singup'
  user?: UserInterface
  setUser?: Dispatch<SetStateAction<UserInterface>>
  setError?: Dispatch<SetStateAction<string | null>>
  setMessage?: Dispatch<SetStateAction<string | null>>
  setCheckAuth?: Dispatch<SetStateAction<boolean>>
}

export default function useUser({
  setError,
  setMessage,
  user,
  setUser,
}: useUserInterface) {
  function get() {
    if (setUser) {
      User.get().then((e) => setUser(e))
    }
  }

  function update() {
    User.update(user ?? {}).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
      }
    })
  }
  function updateAvatar(avatar: File) {
    User.updateAvatar(avatar ?? {}).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
      }
    })
  }
  function updatePassword() {
    User.updatePassword(user ?? {}).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
      }
    })
  }

  function showError(message: any, seconds = 5) {
    if (setError) {
      setError(message)
      setTimeout(() => setError(null), seconds * 1000)
    }
  }
  function showMessage(message: any, seconds = 5) {
    if (setMessage) {
      setMessage(message)
      setTimeout(() => setMessage(null), seconds * 1000)
    }
  }
  return {
    get,
    update,
    updateAvatar,
    updatePassword,
  }
}