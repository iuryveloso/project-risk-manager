export default interface UserInterface {
  _id?: string
  email?: string
  occupation?: string
  company?: string
  firstName?: string
  lastName?: string
  avatar?: File | string
  password?: string
  confirmPassword?: string
  newPassword?: string
}

export function empty() {
  const user: UserInterface = {
    email: '',
    occupation: '',
    company: '',
    firstName: '',
    lastName: '',
    avatar: undefined,
    password: '',
    confirmPassword: '',
    newPassword: '',
  }
  return user
}
