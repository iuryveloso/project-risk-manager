export default interface UserInterface {
  email?: string
  firstName?: string
  lastName?: string
  avatar?: File
  password?: string
  confirmPassword?: string
  newPassword?: string
}

export function empty() {
  const user: UserInterface = {
    email: '',
    firstName: '',
    lastName: '',
    avatar: undefined,
    password: '',
    confirmPassword: '',
    newPassword: '',
  }
  return user
}
